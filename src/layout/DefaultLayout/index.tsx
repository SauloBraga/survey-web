import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

export function DefaultLayout() {
  return (
    <Container maxWidth="md">
      <Header />
      <Outlet/>
    </Container>
  )
}