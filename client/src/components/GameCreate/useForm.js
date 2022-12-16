import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { postGame } from "../../redux/actions"

export const useForm = (initialForm, validateForm) =>{
const [form, setForm] = useState(initialForm)
const [errors, setErrors] = useState({})
const [buttonAct, setButtonAct] = useState(true)
const history = useHistory()
const dispatch = useDispatch()


const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({
        ...form,
        [name]:value 
    }) 
    if(form.name.length && form.platforms.length && form.rating.length && form.description.length){
    setButtonAct(false)
    }
}

const handleSelectGenre = (e) => {
    setForm({
        ...form,
        genre: [...form.genre, e.target.value],
      });
}

const handleSelectPlatform = (e) => {
    setForm({
        ...form,
        platforms: [...form.platforms, e.target.value],
      });
}





const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form))
}

function handleSubmit(e) {
    e.preventDefault();
    if(Object.keys(errors).length === 0)
    {
    dispatch(postGame(form));
    alert("Congratulations, your game has been created");
    setForm({
      name: "",
      description: "",
      released: "",
      rating: "",
      background_image: "",
      platforms: [],
      genre: [],
    })
    history.push("/home");
   }else{
    alert('Complete the required fields')
    } 
  }

return {
    form,
    errors,
    history,
    dispatch,
    handleChange,
    handleSelectGenre,
    handleSelectPlatform,
    handleBlur,
    handleSubmit,
    buttonAct
}
}