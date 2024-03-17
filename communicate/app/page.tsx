import Image from "next/image";
import NavBar from "./components/SideBar";
import Header from "./components/Header";
import Friend from "./components/Friend";
import FriendsPage from "./friends/page";
import SignIn from "./sign-in/page";

export default function Home() {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="navCont">
            <NavBar/>
          </div>
          <div className="headContent">
            <div className="headCont">
              <Header/>
            </div>
            <div className="content">
              <FriendsPage/>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}