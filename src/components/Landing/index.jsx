import React from 'react'
import Brand from '../Nav/brand'
import Account from './Account'
import Footer from '../Footer'
import { Link } from 'react-router-dom'

const Landing = (props) => {
    const {signIn = false} = props.location;
    return (
        <>
        <header className="landing-header">
            <Link to="/">
                <Brand />
            </Link>
            <section className="web-only landing-article-box">
                <article className="landing-article">
                    <h2>
                        track your budget
                    </h2>
                    <img src="https://picsum.photos/536/354" alt=""/>
                </article>
                <article className="landing-article">
                    <h2>
                        plan your investments
                    </h2>
                    <img src="https://picsum.photos/seed/picsum/536/354" alt=""/>
                </article>
                <article className="landing-article">
                    <h2>
                        visualize your budget
                    </h2>
                    <img src="https://picsum.photos/id/237/536/354" alt=""/>
                </article>
            </section>
            <article className="web-only demo-link-box">
                <Link to="/demo" className="demo-link">
                    try demo
                </Link>
            </article>
            <div className="header-form-box">
                <Account signIn = {signIn} />
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
