// Components
import Banner from "../banner/Banner";
import Categories from "./Categories";
import { Grid } from "@mui/material";

const Home = () => {

    return (
        <div>
            <Banner />

            <Grid container>
                <Grid item xs={12} sm={2} lg={2}>
                    <Categories />
                </Grid>
                <Grid item xs={12} sm={10} lg={10}>
                    POSTS
                </Grid>


            </Grid>

        </div>
    )

}

export default Home;