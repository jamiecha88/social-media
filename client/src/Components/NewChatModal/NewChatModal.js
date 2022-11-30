import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Modal, useMantineTheme } from "@mantine/core";
import ChatUsers from "../ChatUsers/ChatUsers";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { createChat } from "../../api/ChatRequests";

const NewChatModal = () => {
    const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);
  const theme = useMantineTheme();

  return (
   <>
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >

    {persons.map((person, id) => {
        if (person._id !== user._id) return <User person={person} setModalOpened={setModalOpened} location="chat" key={id} />;
      })}
      
    
    
    </Modal>
    <button className='button' onClick={() => setModalOpened(true)}>New Chat</button>
    </>
  );
};

export default NewChatModal;