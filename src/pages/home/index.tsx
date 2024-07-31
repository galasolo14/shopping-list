import React from "react";
import Headline from "./../../components/headline";
import Total from "./../../components/total";
import Center from "./../../components/center";
import Line from "./../../components/divider";
import List from "./../../components/list";
import { listStore } from "./../../store/list";

const Home = () => {
    return <div>
        <Headline />
        <Total store={listStore}/>
        <Center store={listStore}/>
        <Line />
        <List store={listStore}/>
    </div>
}

export default Home;