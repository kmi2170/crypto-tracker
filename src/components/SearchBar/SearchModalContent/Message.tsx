import Typography from "@mui/material/Typography";

type MessageProps = {
  isShortCharacter?: boolean;
  listLength?: number;
  isError: boolean;
};

const Message = (props: MessageProps) => {
  const { isShortCharacter, isError } = props;

  let message = "";

  if (isShortCharacter) {
    message = "Type more than one character";
  } else if (isError) {
    message = "Something went wrong. Please try again later";
  }

  if (!message) return;

  return (
    <Typography variant="h6" align="center" sx={{ marginTop: "1rem" }}>
      {message}
    </Typography>
  );
};

export default Message;
