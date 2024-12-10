import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { CandidateListItem } from "./CandidateListItem";
import { ClearButton, CloseButton, MagnifyGlass } from "./buttons";
import LoadingIndicator from "./loadingIndicator";
import { fetchCandidateCoins } from "../../../lib/fetchFunctions";
import { CoinSearch } from "../../../context/types";

const InputWrapper = styled("div")({
  position: "relative",
});

const ListWrapper = styled("div")(({ theme }) => ({
  marginTop: "0.5rem",
  height: "650px",
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    height: "450px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "450px",
  },
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "800px",
  height: "800px",
  boxShadow: 24,
  paddingTop: "2.5rem",
  paddingBottom: "1rem",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  borderRadius: "10px",
};

type SearchModalContentProps = {
  closeModal(): void;
};

const lineColor = "rgba(0,65,106,0.8)";

const SearchModalContent = forwardRef((props: SearchModalContentProps, ref) => {
  const { closeModal } = props;

  const searchParams = useSearchParams();
  const currentSearchPrams = new URLSearchParams(searchParams).toString();
  const router = useRouter();

  const [selectedCandidateId, setSelectedCandidateId] = useState(0);
  const [isShortCharacter, setIsShortCharacter] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [candidates, setCandidates] = useState<CoinSearch[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  console.log({ isLoading });

  const handleGetCandidate = useCallback(async () => {
    const query = inputRef?.current?.value as string;
    try {
      const data = await fetchCandidateCoins(query);
      const { coins } = data;
      setCandidates(coins);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  }, []);

  const handleClickCandidate = useCallback(
    (selectedId: number) => {
      const id = candidates[selectedId].id;
      router.push(`/coins/${id}?${currentSearchPrams}`);
      setSelectedCandidateId(0);
      setCandidates([]);
      closeModal();
    },
    [candidates]
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowUp":
          setSelectedCandidateId((prev) => {
            return prev > 0 ? prev - 1 : prev;
          });
          break;
        case "ArrowDown":
          setSelectedCandidateId((prev) => {
            return prev < candidates.length - 1 ? prev + 1 : prev;
          });
          break;
        case "Enter":
          handleClickCandidate(selectedCandidateId);
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedCandidateId, candidates]);

  function onTypeWithDebounce(e: ChangeEvent) {
    const query = inputRef.current?.value;

    if (!query) return;

    if (query.length <= 1) {
      if (candidates.length > 0) setCandidates([]);
      if (!isShortCharacter) setIsShortCharacter(true);
      return;
    }

    setIsLoading(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = setTimeout(async () => {
      const query = inputRef.current?.value as string;
      if (!query) return;

      try {
        handleGetCandidate();
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }

      if (isShortCharacter) setIsShortCharacter(false);
      timerRef.current = null;
    }, 600);
  }

  const handleHoverCandidate = useCallback((selectedIdx: number) => {
    setSelectedCandidateId(selectedIdx);
  }, []);

  const clearText = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current?.focus();

      setCandidates([]);
      setIsShortCharacter(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, []);

  return (
    <Box
      sx={(theme) => ({
        ...style,
        [theme.breakpoints.down("md")]: {
          width: "600px",
        },
        [theme.breakpoints.down("sm")]: {
          width: "350px",
          height: "600px",
        },
      })}
    >
      {/* <CloseButton onClick={closeModal} /> */}

      <InputWrapper>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter City Name"
          onChange={onTypeWithDebounce}
          onKeyDown={() => {}}
          spellCheck="false"
          autoComplete="off"
          style={{
            paddingLeft: 50,
            height: "3rem",
            width: "100%",
            border: `1px solid ${lineColor}`,
            borderRadius: "10px",
            outline: "none",
          }}
        />
        <MagnifyGlass />
        <ClearButton onClick={clearText} />
      </InputWrapper>

      <Typography
        variant="h6"
        sx={{ mt: "0.5rem", ml: "1rem", fontWeight: "bold" }}
      >
        {candidates.length} Candidates Found
      </Typography>

      <ListWrapper>
        <>
          {candidates?.map((candidate, i) => {
            return (
              <CandidateListItem
                key={candidate.id}
                index={i}
                candidate={candidate}
                isSelected={selectedCandidateId === i}
                handleClickCandidate={handleClickCandidate}
                handleHoverCandidate={handleHoverCandidate}
              />
            );
          })}

          <Message
            isShortCharacter={isShortCharacter}
            // listLength={candidates.length}
            isLoading={isLoading}
            isError={isError}
          />
        </>
      </ListWrapper>
    </Box>
  );
});

export default SearchModalContent;

type MessageProps = {
  isShortCharacter?: boolean;
  listLength?: number;
  isLoading: boolean;
  isError: boolean;
};

function Message(props: MessageProps) {
  const { isShortCharacter, isLoading, isError } = props;

  let message = "";

  if (!isLoading) {
    if (isShortCharacter) {
      message = "Type more than one character";
    } else if (isError) {
      message = "Something went wrong. Please try again later";
      // } else if (listLength === 0) {
      //   message = "No Candidate was Found";
    }
  }

  return (
    <>
      {isLoading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "6rem" }}
        >
          <LoadingIndicator />
        </Box>
      )}
      {message && (
        <Typography variant="h6" align="center" sx={{ marginTop: "1rem" }}>
          {message}
        </Typography>
      )}
    </>
  );
}
