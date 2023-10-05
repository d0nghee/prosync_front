import { Link, useRouteLoaderData } from "react-router-dom";
import axiosInstance from "../../util/axiosInstancs";
import { getCookie } from "../../util/cookies";
import { useEffect } from "react";
import { HomeGridContainer } from "../../css/HomeStyle";

function Home() {
    const isLoggedIn = Boolean(useRouteLoaderData("root"));
    


    
        if (!isLoggedIn) {
            return (
                <>
                    <HomeGridContainer>

                    </HomeGridContainer>
                    <HomeGridContainer>

                    </HomeGridContainer>
                    <HomeGridContainer>

                    </HomeGridContainer>
                </>
            )
        } else if (isLoggedIn) {
            return (
                <>
                    <HomeGridContainer>
                        내 프로젝트
                    </HomeGridContainer>
                    <HomeGridContainer>
                        모든 프로젝트
                    </HomeGridContainer>
                </>
            );
        }
    


}

export default Home;