import React, { useEffect, useState } from "react";
import { Container, Text, Heading } from "@chakra-ui/react";
import { getAllSongs, getUserIdFromReference, Song } from "../util/firestoreFunctions";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";
import { useParams } from "react-router-dom";
//import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export const SongContainer = () => {
  const [data, setData] = useState<Array<Song>>([]);
  const { userReference, pamphletName } = useParams();
  const [userID, setUserID] = useState("")

  /* Use the userReference in the URL, to get the corresponding userID */
  useEffect(() => {
    const fetchUserID = async () => {
      if (userReference) {
        await getUserIdFromReference(userReference).then((r) => setUserID(r));
      }
    };
    fetchUserID().catch(console.error);
  }, [userReference]);

  /* Fetch all songs with the given userID and pamphletName */
  useEffect(() => {
    const fetchSongs = async () => {
      setData([]);

      if (pamphletName && userID !== "") {
        await getAllSongs(pamphletName, userID).then((r) => setData(r));
      }
    };

    fetchSongs().catch(console.error);
  }, [userID, pamphletName])

  return (
    <div className="carousel-wrapper">
      <Carousel swipeScrollTolerance={100} showIndicators={false} showThumbs={false}>
        {data &&
          data.map((d, index) => {
            return (
              <Container key={index}>
                <Heading mt={5}>{d.title}</Heading>
                <Text as="i">Av: {d.creator}</Text>
                <Text mt={3}>{d.text}</Text>
              </Container>
            );
          })}
      </Carousel>
    </div>
  );
};
