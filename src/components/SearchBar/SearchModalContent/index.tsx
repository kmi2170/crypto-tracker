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
import { styled, useTheme } from "@mui/material/styles";

import CandidateListItem from "./CandidateListItem";
import { ClearButton, CloseButton, MagnifyGlass } from "./Buttons";
import { fetchCandidateCoins } from "../../../lib/fetchFunctions";
import { CoinSearch } from "../../../api/types";
import Message from "./Message";
import LoadingIndicator from "../../LoadingIndicator";

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

const SearchModalContent = forwardRef(function SearchModalContent(
  props: SearchModalContentProps,
  ref
) {
  const { closeModal } = props;

  const theme = useTheme();

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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
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
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedCandidateId, candidates]);

  const onTypeWithDebounce = (e: ChangeEvent) => {
    const query = inputRef.current?.value as string;

    if (query?.length <= 1) {
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
        getCandidate();
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }

      if (isShortCharacter) setIsShortCharacter(false);
      timerRef.current = null;
    }, 600);
  };

  const getCandidate = useCallback(async () => {
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

  const handleHoverCandidate = useCallback((selectedIdx: number) => {
    setSelectedCandidateId(selectedIdx);
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
          placeholder="Search Coin"
          onChange={onTypeWithDebounce}
          onKeyDown={() => {}}
          spellCheck="false"
          autoComplete="off"
          style={{
            paddingLeft: 50,
            height: "3rem",
            width: "100%",
            border: `1px solid ${theme.palette.primary.main}`,
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
            const { name, symbol, thumb } = candidate;
            const itemName = `(${symbol}) ${name}`;

            return (
              <CandidateListItem
                key={candidate.id}
                index={i}
                itemName={itemName}
                itemImgUrl={thumb}
                isSelected={selectedCandidateId === i}
                oddLineBgColor={theme.palette.primary.light}
                selectedBgColor={theme.palette.primary.main}
                handleClickCandidate={handleClickCandidate}
                handleHoverCandidate={handleHoverCandidate}
              />
            );
          })}

          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "6rem",
              }}
            >
              <LoadingIndicator />
            </Box>
          ) : (
            <Message
              isShortCharacter={isShortCharacter}
              isError={isError}
              // listLength={candidates.length}
            />
          )}
        </>
      </ListWrapper>
    </Box>
  );
});

export default SearchModalContent;
