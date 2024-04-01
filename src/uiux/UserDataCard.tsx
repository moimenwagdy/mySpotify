import { ReactNode } from "react";

const UserDataCard: React.FC<{
  userName: string;
  userEmail: string;
  followers: number;
  imgSRC: string;
  children?: ReactNode;
}> = ({ userName, imgSRC, followers, userEmail, children }) => {
  return (
    <aside id="userData" className=" flex flex-col w-full  ">
      <div className="self-center w-full flex justify-cnter gap-x-3 ">
        <div className="flex justify-center items-center">
          <img
            src={imgSRC}
            className="w-10 h-10 rounded-full"
            alt="user-Image"></img>
        </div>
        <div className="-space-y-1">
          <p className="font-[700]">{userName}</p>
          <p className="text-sm">{userEmail}</p>
          <div className="flex gap-x-2">
            <p className="text-sm ">followers {followers}</p>
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default UserDataCard;
