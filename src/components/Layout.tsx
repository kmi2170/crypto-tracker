import { makeStyles } from '@mui/styles';
import Header from "../components/Header";

const useStyles = makeStyles(() => ({
  appLayout: {
    background: "#14161a",
    color: "white",
    minHeight: "100vh",
  }
}))

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles()

  return (
    <div >
      <Header />
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout 
