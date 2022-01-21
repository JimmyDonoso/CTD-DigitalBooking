import style from "../../styles/footer.module.css";
import iconFB from "../../img/icon facebook.png"
import iconLinkedin from "../../img/icon linkedin.png"
import iconIG from "../../img/icon ig.png"
import iconTwitter from "../../img/tweet.png"



function Footer(){
    return(
        <footer className= {style.footer}>
            <p className={style.leyenda2}>©2021 Digital Booking</p>
            <div className={style.logo_box}>
                <a href="https://www.facebook.com/" target="_blank"> <img className = {style.logo}  alt = "facebook" src = {iconFB}/></a>
                <a href="https://www.linkedin.com/" target="_blank"> <img className = {style.logo}  alt = "linkedin" src = {iconLinkedin}/></a>
                <a href="https://www.instagram.com/" target="_blank"> <img className = {style.logo}  alt = "instagram" src = {iconIG}/></a>
                <a href="https://twitter.com/" target="_blank"> <img className = {style.logo}  alt = "twitter" src = {iconTwitter}/></a>
            </div>
        </footer>
    )
}

export default Footer;