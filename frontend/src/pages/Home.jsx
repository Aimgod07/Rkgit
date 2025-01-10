import React from 'react';
import Hero from  "../components/Hero"
import Department from  "../components/Department"
import MessageForm from  "../components/MessageForm"
import Biography from  "../components/Biography"

const Home = () => {
  return <>
  <Hero title={"Welcome to Rkgit Institute of Medical Science"} imageUrl={"/hero.png"}/>
  <Biography  imageUrl={"/about.png"}/>
  <Department/>
  <MessageForm/>
  </>
};

export default Home;
