import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import {FaPowerOff, FaSearch} from "react-icons/fa";
import {signOut, onAuthStateChanged} from "firebase/auth";
import {firebaseAuth} from "../utils/firebase-config"

const Container = styled.div`
    .scrolled{
        background-color: black;
    }
    nav{
        position: sticky;
        top: 0;
        height: 6.5rem;
        width: 100%;
        justify-content: space-between;
        position: fixed;
        z-index: 2;
        padding: 0 2rem;
        align-items: center;
        transition: 0.3s ease-in-out;
        .left{
            gap: 2rem;
            .brand{
                img{
                    height: 4rem;
                }
            }
            .links{
                list-style-type: none;
                gap: 2rem;
                li{
                    a{
                        color: white;
                        text-decoration: none;
                    }
                }
            }
        }
        .right{
            gap: 1rem;
            button{
                background-color: transparent;
                border: none;
                cursor: pointer;
                &:focus {
                    outline: none;
                }
                svg{
                    color: #f34242;
                    font-size: 1rem;
                }
            }
            .search{
                display: flex;
                gap: 0.4rem;
                align-items: center;
                justify-content: center;
                padding: 0.2rem;
                padding-left: 0.5rem;
                button{
                    background-color: transparent;
                    svg{
                        color: white;
                    }
                }
                input{
                    width: 0;
                    opacity: 0;
                    visibility: hidden;
                    transition: 0.3s ease-in-out;
                    background-color: transparent;
                    border: none;
                    color: white;
                    &:focus{
                        outline: none;
                    }
                }
            }
            .show-search{
                border: 1px solid white;
                background-color: rgba(0,0,0,0.6);
                input{
                    width: 100px;
                    opacity: 1;
                    visibility: visible;
                    padding: 0.3rem;
                }
            }
        }
    }
    
    @media (max-width:700px) {
        nav{
        padding: 1rem !important ;
        .left{
            gap: 0 !important;
            .brand{
                img{
                    height: 2rem !important;
                }
            }
            .links{
                gap: 0 !important;
                text-align: start !important;
                li{
                    padding: 0.8rem !important;
                    display: flex;
                    align-items: flex-start;
                    a{
                        font-size: .7rem !important;
                    }
                }
            }
        }
        .right{
            gap: 0.5rem !important;
            button{
                display: flex;
                align-items: center;
                svg{
                    font-size: 0.8rem;
                }
            }
            .search{
                display: none;
            }
        }
    }
  }
`;

const Navbar = ({isScrolled}) => {
    const links = [
        {name:"Home", link:"/"},
        {name:"TV Shows", link:"/tv"},
        {name:"Movies", link:"/movies"},
        {name:"My List", link:"/myList"},
    ]

    const navigate = useNavigate()

    const [showSearch,setShowSearch] = useState(false);
    const [inputHover,setInputHover] = useState(false);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login");
      });
  return (

   
    <Container>
       <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
            <div className="brand flex a-center j-center">
                <Link to="/">
                    <img src={logo} alt="logo"/>
                </Link>
                
            </div>
            <ul className="links flex">
                {links.map(({name,link}) => {
                    return (
                        <li key={name}>
                            <Link to={link}>{name}</Link>
                        </li>
                    )
                })}
            </ul>
        </div> 
        <div className="right flex a-center">
            <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button onFocus={() => setShowSearch(true)} onBlur={() => {
                    if (!inputHover) setShowSearch(false);
                }}>
                   <FaSearch/> 
                </button>
                <input type="text" placeholder="Search" onMouseEnter = {() => setInputHover(true)} onMouseLeave={() => setInputHover(false)} onBlur={() => {
                    setShowSearch(false);
                    setInputHover(false);
                }}/>
   
            </div>
            <button onClick={() => signOut(firebaseAuth)}>
                <FaPowerOff/>
            </button>
        </div>
       </nav> 
    </Container>
  )
}

export default Navbar