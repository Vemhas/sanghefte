import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateSongInPamphlet,
  getSong,
  Song,
} from "../util/firestoreFunctions";

export const UpdateSong = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [songTitle, setSongTitle] = useState("");
  const [songCreator, setSongCreator] = useState("");
  const [songText, setSongText] = useState("");

  const localStorage_userIdKey = "userID";

  const userID = localStorage.getItem(localStorage_userIdKey);
  const songID = sessionStorage.getItem("currentSong_id");
  const pamphlet_title = sessionStorage.getItem("currentPamphlet_title");

  const handleClick_updateSong = () => {
    if (userID !== null && songID !== null && pamphlet_title !== null) {
      updateSongInPamphlet(
        userID,
        pamphlet_title,
        songID,
        songTitle,
        songText,
        songCreator
      ).catch(console.error);
      toast({
        title: "Sang er redigert.",
        description: "Den oppdaterte sangen ligger nå i heftet.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClick_backToMenu = () => {
    navigate("/pamphletMenu");
  };

  const updateValueOfFields = (result: Song) => {
    setSongTitle(result.title);
    setSongCreator(result.creator);
    setSongText(result.text);
  };

  useEffect(() => {
    const userID = localStorage.getItem(localStorage_userIdKey);
    if (userID && pamphlet_title && songID)
      getSong(userID, pamphlet_title, songID).then((r) =>
        updateValueOfFields(r)
      );
  }, [pamphlet_title, songID]);

  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="nowrap"
      minH="100vh"
      px={8}
    >
      <Container>
        <VStack spacing={3}>
          <Heading>Rediger sang</Heading>
          <Divider />
          <Heading size="sm"> Tittel </Heading>
          <Input
            textAlign="center"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
          <Heading size="sm"> Artist </Heading>
          <Input
            textAlign="center"
            value={songCreator}
            onChange={(e) => setSongCreator(e.target.value)}
          />
          <Heading size="sm"> Sangtekst </Heading>
          <Textarea
            textAlign="center"
            value={songText}
            onChange={(e) => setSongText(e.target.value)}
          />
          <Button
            onClick={handleClick_updateSong}
            isFullWidth
            colorScheme="teal"
          >
            Lagre endringer
          </Button>
          <Button isFullWidth onClick={handleClick_backToMenu}>
            Tilbake
          </Button>
        </VStack>
      </Container>
    </Flex>
  );
};