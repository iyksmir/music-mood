import { memo } from "react";

import useZustandStore from "@zustand/zustandStore.ts";

import ButtonConstructor from "@components/buttons/button-constructor/button-constructor.tsx";
import FavoriteIcon from "@src/icons/favorite-icon.tsx";

import { ISearch } from "@src/api/interfaces.ts";

type Props = {
  currentAudio: ISearch,
};

const Header = memo(({ currentAudio }: Props) => {
  const favoriteList = useZustandStore(state => state.favoriteList);
  const addToFavoriteList = useZustandStore(state => state.addToFavoriteList);
  const removeFromFavoriteList = useZustandStore(state => state.removeFromFavoriteList);

  const isFavorite = favoriteList.has(Number(currentAudio.id));

  const { artist, title, link } = currentAudio;

  const favoriteButtonHandler = () => {
    if (!isFavorite) {
      addToFavoriteList(currentAudio);
    } else {
      removeFromFavoriteList(Number(currentAudio.id));
    }
  }

  return (
    <div className="flex justify-between">
      <div className="w-10/12">
        <a
          className="block overflow-hidden text-ellipsis whitespace-nowrap swiper-no-swiping underline cursor-pointer hover:opacity-80 active:opacity-60"
          href={link}
          title={`${artist.name} - ${title}`}
          target="_blank"
        >
          {artist.name} - {title}
        </a>
      </div>
      <div>
        <ButtonConstructor extraClassName="w-5 group" onClickHandler={favoriteButtonHandler} title="Add to favorite list">
          <FavoriteIcon className={`${isFavorite ? "fill-neonPink" : "fill-neonDarkerPurple"} group-hover:fill-neonPurple group-active:opacity-60 transition-all`} />
        </ButtonConstructor>
      </div>
    </div>
  );
})

export default Header;
