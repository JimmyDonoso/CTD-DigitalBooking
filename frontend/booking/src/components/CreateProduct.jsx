import React from "react";
import Header from "./tools/Header"
import style from "../styles/createProduct.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt, faHeart, faMapMarkerAlt, faStar, faBath, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { URLSERVER } from "../config/index";


const schema = yup
	.object()
	.shape({
		names: yup.string().required("El nombre es requerido"),
		category: yup.string().required("La categoría es requerida"),
		adress: yup.string().required("La direccion es requerida"),
		city: yup.string().required("La ciudad es requerida"),
		description: yup.string().required("La descripción es requerida"),
		latitude: yup.string().required("La latitud es requerida"),
		longitude: yup.string().required("La longitud es requerida"),
		// attribute: yup.string().required("Seleccione almenos un atributo"),
		rules: yup.string().required("La descripción es requerida"),
		security: yup.string().required("La descripción es requerida"),
		politics: yup.string().required("La descripción es requerida"),
		name: yup.string().required("El nombre de la imágen es requeridos"),
		image: yup.string().required("El url de la imágen es requeridos"),
	})
	.required();


const CreateProduct = () => {
	let token = useSelector(state => state.auth.token);
	const [cities, setCities] = useState([]);
	const [category, setCategory] = useState([]);
	const [ShowResults, setShowResults] = useState(false);
	const [featureSet, setFeatureSet] = useState([]);
	const [featureSetNew, setFeatureSetNew] = useState([{ id: "" }]);
	const [imagesSet, setImagesSet] = useState([{ name: "", image: "" },]);
	const history = useHistory();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		document.title = 'Administración de productos';
	}, [])

	useEffect(() => {
		axios.get(`${URLSERVER}/cities`)
			.then((res) => {
				setCities(res.data)
			})
			.catch((error) => {
				console.log(error);
			})
	}, [])

	useEffect(() => {
		axios.get(`${URLSERVER}/categories`)
			.then((res) => {
				setCategory(res.data)
			})
			.catch((error) => {
				console.log(error);
			})
	}, [])

	useEffect(() => {
		axios.get(`${URLSERVER}/feature/search`)
			.then((res) => {
				setFeatureSet(res.data)
			})
			.catch((error) => {
				console.log(error);
			})
	}, [])

	const showMessage = () => {
		setShowResults(true);
	}

	const config = {
		headers: { Authorization: token }
	};

	const productRegister = (data) => {
		axios.post(`${URLSERVER}/products/add`, data, config)
			.then((res) => {
				
				history.push("/create-product/successful-ad/")
			})
			.catch((error) => {
				console.log(error);
				showMessage();
			})
	}

	const HandleAddImage = (e) => {
		e.preventDefault();
		setImagesSet([...imagesSet, { name: "", image: "" }]);
	}
	const handleOnChangeImage = (e, index) => {
		const values = [...imagesSet];
		values[index][e.target.name] = e.target.value;
		setImagesSet(values);
	}

	// if (e.target.checked) {
	// 	
	// } else {
	// 	values.splice(index, 1);
	// }

	const createNextFeature = () => {
		setFeatureSetNew([...featureSetNew, { id: "" }]);
	}

	const handleOnChangeFeature = (e, index) => {
		const values = [...featureSetNew];
		values[featureSetNew.length-1]["id"] = e.target.value;
		setFeatureSetNew(values);
		createNextFeature();
		
	}

	const HandleRemoveImage = (e, i) => {
		e.preventDefault();
		const values = [...imagesSet];
		values.splice(i, 1);
		setImagesSet(values);
	}

	// const HandleFeature = (e) => {
	// 	e.preventDefault();
	// 	// console.log("data e", e);
	// 	// console.log("data form", featureSet);
	// 	// console.log("data id value", e.target.value);
	// 	// setFeatureSet([...featureSet, {id:""}]);
	// }


	const onSubmit = (data) => {
		let userData = {
			// name: data.name,
			// category: data.category,
			// adress: data.adress,
			// city: data.city,
			// description: data.description,
			// latitude: data.latitude,
			// longitude: data.longitude,
			// attribute: data.attribute,
			// icon: data.icon,
			// // rules: data.rules,
			// // security: data.security,
			// // politics: data.politics,
			// images: data.images
			"name": data.names,
			"description": data.description,
			"category": { id: data.category },
			"city": { id: data.city },
			"latitude": data.latitude,
			"longitude": data.longitude,
			"address": data.adress,
			"price": 100,
			"featuresSet": featureSetNew,
			"images": imagesSet
		}
		productRegister(userData);
	
	}

	return (
		<>
			<Header title="Sentite como en tu hogar" />

			<nav className={style.product}>
				<div>
					<p className={style.category}>Administrador</p>
				</div>
				<div>
					<Link to="/"><FontAwesomeIcon icon={faChevronLeft} className={style.faChevronLeft} /></Link>
				</div>
			</nav>

			<h2 className={style.h2}>Crear propiedad</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				{ShowResults ?
					<p className={style.errorProduct}>Lamentablemente el producto no ha podido crearse. Por favor intente más tarde</p>
					:
					null
				}
				<div className={style.form} >

					<div className={style.inputContainerDoble}>
						<div className={style.inputContainer}>
							<label>Nombre del producto</label>
							<input type="text" {...register("names")} id="name" placeholder="Hotel Hemirage" className={style.entry}
							/>
							{errors.names && (
								<p className={style.errorMessage}>{errors.names.message}</p>
							)}

						</div>

						<div className={style.inputContainerOption}>
							<label>Categoría</label>
							<select className={style.inputSearch} {...register("category")}>
								<option id="category" selected disabled className={style.option} value=''>Categoría</option>
								{category.map(category =>
									<option value={category.id} className={style.option} placeholder="Categoría"
										id="category" >{category.title}</option>)}
							</select>
							{errors.category && (
								<p className={style.errorMessage}>{errors.category.message}</p>
							)}
						</div>
					</div>

					<div className={style.inputContainerDoble}>
						<div className={style.inputContainer}>
							<label>Dirección</label>
							<input type="text" {...register("adress")} placeholder="Bolivar 300" className={style.entry}
								id="adress"
							/>

							{errors.adress && (
								<p className={style.errorMessage}>{errors.adress.message}</p>
							)}
						</div>

						<div className={style.inputContainerOption}>
							<label>Ciudad</label>
							<select className={style.inputSearch} {...register("city")}>
								<option id="title" selected disabled className={style.option} value=''>Ciudad
								</option>
								{cities.map(city =>
									<option value={city.id} className={style.option} id="city" placeholder="Ciudad"
									>{city.city}, {city.country}</option>)}
							</select>
							{errors.city && (
								<p className={style.errorMessage}>{errors.city.message}</p>
							)}
						</div>

					</div>

					<div className={style.textareaBox}>
						<label className={style.label}>Descripción</label>
						<textarea id="description" {...register("description")} placeholder="Escriba algo aquí" className={style.textarea}
						/>
						{errors.description && (
							<p className={style.errorMessage}>{errors.description.message}</p>
						)}
					</div>


					<div className={style.inputContainerDoble}>
						<div className={style.inputContainer}>
							<label>Latitud</label>
							<input type="text" {...register("latitude")} id="latitude" placeholder="Latitud" className={style.entry}
							/>
							{errors.latitude && (
								<p className={style.errorMessage}>{errors.latitude.message}</p>
							)}
						</div>
						<div className={style.inputContainer}>
							<label>Longitud</label>
							<input type="text" {...register("longitude")} id="longitude" placeholder="Longitud" className={style.entry} />
							{errors.longitude && (
								<p className={style.errorMessage}>{errors.longitude.message}</p>
							)}
						</div>


					</div>

					<div className={style.atributosBox}>
						<h3 >Agregar servicios</h3>
						<div className={style.iconBox}>
							<div className={style.inputContainerAtributo}>
								<div className={style.inputContainer}>
									<ul className={style.features} type="none">
										{featureSet.map((item,index) => { return <li key={item.id} className={style.feature}> <input className={style.checkboxI} value={item.id} {...register("id")} type="checkbox" name={item.id} onChange={e=>handleOnChangeFeature(e,index)} /> <i className={item.icon}></i> {item.name}</li>})}
									</ul>
									{errors.id && (<p className={style.errorMessage}>{errors.id.message}</p>)}

								</div>

							</div>
						</div>
					</div>

					<div className={style.policyBox}>
						<h3>Políticas del producto</h3>
						<div className={style.iconBox}>
							<div className={style.productPoliticsBox}>
								<div className={style.contentPoliticsBox}>
									<h4 className={style.h4}>Normas de la casa</h4>
									<label>Descripción</label>
									<textarea type="text" {...register("rules")} id="rules" placeholder="Escriba aquí" className={style.textarea} />
									{errors.rules && (
										<p className={style.errorMessage}>{errors.rules.message}</p>
									)}
								</div>

								<div className={style.contentPoliticsBox}>
									<h4 className={style.h4}>Salud y seguridad</h4>
									<label >Descripción</label>
									<textarea type="text" {...register("security")} id="security" placeholder="Escriba aquí" className={style.textarea} />
									{errors.security && (
										<p className={style.errorMessage}>{errors.security.message}</p>
									)}
								</div>

								<div className={style.contentPoliticsBox}>
									<h4 className={style.h4}>Politicas de cancelación</h4>
									<label>Descripción</label>
									<textarea type="text" {...register("politics")} id="politics" placeholder="Escriba aquí" className={style.textarea} />
									{errors.politics && (
										<p className={style.errorMessage}>{errors.politics.message}</p>
									)}
								</div>

							</div>
						</div>
					</div>

					<div className={style.policyBox}>
						<h3>Agregar imágenes</h3>
						<div className={style.iconBox}>
							{imagesSet.map((imageSet, index) => {
								return (
									<div key={index}>
										<p>Imagen {index + 1}</p>
										<input type="text" {...register("name")} id="imageName" className={style.imageBox} value={imageSet.name} placeholder="Name" onChange={e => handleOnChangeImage(e, index)} /><br />
										{errors.name && (<p className={style.errorMessage}>{errors.name.message}</p>)}
										<input type="text" {...register("image")} id="imageUrl" className={style.imageBox} value={imageSet.image} placeholder="Insertar http://" onChange={e => handleOnChangeImage(e, index)}/>
										{errors.image && (<p className={style.errorMessage}>{errors.image.message}</p>)}
										<button onClick={e => HandleRemoveImage(e, index)} className={style.buttonDelete} >-</button>
									</div>
								)
							})} 
						</div>
						<div className={style.imgButtonAdd}>
							<button onClick={e => HandleAddImage(e)} className={style.buttonAdd} >+</button>
						</div>
					</div>

					<div className={style.buttonBox}>
						<button className={style.button} type="submit">Crear</button>
					</div>
				</div>
			</form>
		</>
	)
}
export default CreateProduct
