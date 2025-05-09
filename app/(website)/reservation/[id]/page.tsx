import HeaderPage from "./components/header-page";
import Content from "./components/Content";
import { datas, espaces } from "@/config/data";
import ListSpaceCard from "./components/list-space-card";

export default async function ItemSpace(){
  return (
    <div>
      <HeaderPage group={undefined} space={undefined} />
      {/* <Content group={group} space={item} /> */}
      <ListSpaceCard />
    </div>
  );
}
