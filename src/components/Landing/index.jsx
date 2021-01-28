import React, { useContext, useEffect} from 'react'
import Brand from '../Nav/brand'
import Login from './Login'
import Footer from '../Footer'
import { Link , useHistory } from 'react-router-dom'
import { LoginContext } from '../../contexts/LoginContext'

const Landing = () => {
    const {user} = useContext(LoginContext)
    const history = useHistory();

    useEffect(() => {
        let isMounted = true;
        if(user && isMounted) {
            return () => history.push("/dashboard");
        }
        return () => {isMounted = false;}
    }, [user, history])

    return (
        <>
        <header className="landing-header">
            <Link to="/">
                <Brand />
            </Link>
            <section className="web-only">
                <h2 className="landing-article">
                    <span>
                        your one stop budget solution
                    </span>
                </h2>
            </section>
            <article className="web-only demo-link-box">
                <Link to="/demo" className="demo-link">
                    try demo
                </Link>
            </article>
            <div className="header-form-box">
                <Login  />
                <article className="mobile-only demo-link-box">
                    <Link to="/demo" className="demo-link">
                        try demo
                    </Link>
                </article>
            </div>
        </header>
        <Footer />
        </>
    )
}

export default Landing
