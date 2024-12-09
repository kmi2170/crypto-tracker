import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";

import { CandidateListItem } from "./CandidateListItem";
import { ClearButton, CloseButton, MagnifyGlass } from "./buttons";
import LoadingIndicator from "./loadingIndicator";

const InputWrapper = styled("div")({
  position: "relative",
  marginTop: 50,
});

const ListWrapper = styled("div")({
  marginTop: "1.5rem",
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "800px",
  height: "800px",
  maxHeight: "100vh",
  overflowY: "auto",
  boxShadow: 24,
  padding: 4,
  borderRadius: "10px",
};

type SearchModalContentProps = {
  closeModal(): void;
};

const lineColor = "rgba(0,65,106,0.8)";

const SearchModalContent = forwardRef((props: SearchModalContentProps, ref) => {
  const theme = useTheme();

  const { closeModal } = props;

  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(0);
  const [isShortCharacter, setIsShortCharacter] = useState(true);
  const [candidates, setCandidates] = useState<any[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClickCandidate = useCallback(
    (candidate: any) => {},
    [candidates]
  );

  const handleGetCandidate = (query: string) => {
    console.log(query);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowUp":
          setSelectedCandidateIndex((prev) => {
            return prev > 0 ? prev - 1 : prev;
          });
          break;
        case "ArrowDown":
          setSelectedCandidateIndex((prev) => {
            return prev < candidates.length - 1 ? prev + 1 : prev;
          });
          break;
        case "Enter":
          const candidate = candidates[selectedCandidateIndex];
          handleClickCandidate(candidate);
          closeModal();
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedCandidateIndex, candidates]);

  function onTypeWithDebounce(e: ChangeEvent) {
    if (!inputRef.current?.value) return;

    if (inputRef.current.value.length <= 1) {
      if (candidates.length !== 0) setCandidates([]);
      if (!isShortCharacter) setIsShortCharacter(true);
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = setTimeout(async () => {
      const query = inputRef.current?.value as string;
      try {
        handleGetCandidate(query);
      } catch (error) {
        console.error(error);
      }

      if (isShortCharacter) setIsShortCharacter(false);
      timerRef.current = null;
    }, 500);
  }

  const handleHoverCandidate = useCallback((selectedIdx: number) => {
    setSelectedCandidateIndex(selectedIdx);
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
      <CloseButton onClick={closeModal} />

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

      <ListWrapper>
        {candidates?.map((candidate, i) => {
          return (
            <CandidateListItem
              key={candidate}
              index={i}
              candidate={candidate}
              isSelected={selectedCandidateIndex === i}
              handleClickCandidate={handleClickCandidate}
              handleHoverCandidate={handleHoverCandidate}
            />
          );
        })}
      </ListWrapper>

      {/* <Message
        isShortCharacter={isShortCharacter}
        listLength={locations.length}
        isLoading={isLoading}
        isError={isError}
      /> */}
    </Box>
  );
});

export default SearchModalContent;

type MessageProps = {
  isShortCharacter: boolean;
  listLength: number;
  isLoading: boolean;
  isError: boolean;
};

function Message(props: MessageProps) {
  const { isShortCharacter, listLength, isLoading, isError } = props;

  let message = "";

  if (!isLoading) {
    if (isShortCharacter) {
      message = "Type more than one character";
    } else if (isError) {
      message = "Something went wrong. Please try again later";
    } else if (listLength === 0) {
      message = "No Place was Found";
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
