import { Box, Typography, InputBase } from "@mui/material";

interface IntroData {
  title: string;
  subIntro: string;
}

interface IntroObjectProps {
  intro: IntroData;
  isEditing: boolean;
  setData: (data: IntroData) => void;
}

const IntroSection = ({ intro, isEditing, setData }: IntroObjectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...intro, [name]: value });
  };

  return (
    <Box
      sx={{
        paddingLeft: "5em",
      }}
    >
      {isEditing ? (
        <>
          <InputBase
            name="title"
            value={intro.title}
            onChange={handleChange}
            multiline
            sx={{
              fontSize: "70px",
              color: "#828282",
              lineHeight: "1.1",
              fontWeight: "500",
            }}
          />
          <InputBase
            name="subIntro"
            value={intro.subIntro}
            onChange={handleChange}
            fullWidth
            multiline
            sx={{
              fontSize: "18px",
              color: "black",
              marginTop: "1rem",
            }}
          />
        </>
      ) : (
        <>
          <Typography
            sx={{
              fontSize: "70px",
              color: "#828282",
              lineHeight: "1.1",
              fontWeight: "500",
            }}
          >
            {intro.title}.
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: "black",
              marginTop: "1rem",
            }}
          >
            {intro.subIntro}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default IntroSection;
