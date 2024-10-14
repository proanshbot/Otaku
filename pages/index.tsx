import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModel";
import useMovieList from "@/hooks/useMoviesList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if(!session){
    return{
      redirect:{
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return{
    props: {}
  }
}

export default function Home() {
  const {data: movies = []} = useMovieList();
  const {data: favorites = []} = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal  visable={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now On SkyAnime" data={movies}/>
        <MovieList title="Favorite" data={favorites}/>
      </div>
    </>
  )
}
