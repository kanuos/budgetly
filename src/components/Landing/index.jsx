import React from 'react'
import Brand from '../Nav/brand'
import Account from './Account'
import Footer from '../Footer'

const index = () => {
    return (
        <>
        <header className="landing-header">
            <Brand />
            <article className="web-only">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore at deserunt cupiditate commodi accusamus similique?
            </article>
            <div className="header-form-box">
                <Account />
            </div>
        </header>
        <Footer />
        </>
    )
}

export default index
