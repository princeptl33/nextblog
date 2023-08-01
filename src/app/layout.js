import Navbar from "./components/Navbar";
import UserContext from "./components/UserContext";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
    
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
      </head>
      <body className="box">
        <Navbar />
        <UserContext>
        {children}
        </UserContext>
      
        </body>
    </html>
  );
}
