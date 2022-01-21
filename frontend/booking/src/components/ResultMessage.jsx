import style from "../styles/resultMessage.module.css";
import Header from "./tools/Header";
import Check from "../img/atomoCheck.svg";
import { Link } from "react-router-dom";

const ResultMessage = (props) => {

	return (
		<>
			<Header title="Sentite como en tu hogar" />
			<div className={style.successful}>
				<div className={style.messageBox}>

					<img className={style.check} src={Check} alt="CheckExitoso"></img>
                    <h2>{props.title}</h2>
                    <p>{props.description}</p>
					<Link to="/"><button className={style.BotonOk} type="submit">Ok</button></Link>
				</div>
			</div>
		</>
	);
};


export default ResultMessage;
