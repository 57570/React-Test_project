import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Details from "./Details";
import { Toast } from "bootstrap";
import toast, { Toaster } from 'react-hot-toast';
const Home = () => {
  const [shows, setShows] = useState([]);
  const [image, setImage] = useState([]);
  const [selected,setSelected] = useState({});
  const [isSelected,SetIsSelected] = useState(false)
  const [isBack,setIsBack] = useState(false)
  const [isClick,setIsClick] = useState(false)
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()
    // const [url,setUrl] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          "https://api.tvmaze.com/search/shows?q=all"
        );
          // console.log(data.show.image.medium)
        setShows(data);
        // setUrl(data.show.image.medium)
      } catch (error) {
        alert("Error");
      }
    };
    getData();

  }, []);

  const HandleClick = (s) =>{
    setSelected(s)
    SetIsSelected(true)
    localStorage.setItem('SelectedMovie', JSON.stringify(s));
  }

    const notify =()=>{
      toast.success("Ticket details will be shared on your email")
      localStorage.setItem('User', JSON.stringify({name,email,password}));

    }

  return (
    <>
    {selected && isSelected ?
    <div>
      <button className="btn btn-primary backBtn" onClick={()=>SetIsSelected(false)}>
        Back
      </button>
      
      <div className="detailsCard">

      <div className="card" style={{ width: "18rem" }} key={selected.show.id}>
          <img className="card-img-top" src={selected.show.image.medium} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{selected.show.name}</h5>
            
          </div>
          
      </div>
      <div className="box">
      <h3 className="info">
          Show info
        </h3>     
        <div className="summary">{selected.show.summary}</div>
        <div className="language">
          Language : {selected.show.language}
        </div>

        <div className="language">
            Rating : {selected.show.rating.average}
        </div>

        <div className="language">
            Genres : {selected.show.genres.map((g)=>g+",")}
        </div>


        <div className="language">
            Average Runtime : {selected.show.averageRuntime}
        </div>





        <button
    type="button"
    className="btn btn-primary book language"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Book tickets 
  </button>

      </div>
      
      
      </div>
      <>
  {/* Button trigger modal */}
 
  {/* Modal */}
  <div
    className="modal fade"
    id="exampleModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            {selected.show.name}
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="input-group mb-3">
        <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
        <input type="text" className="form-control" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" />
        <input type="text" className="form-control" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" />

</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-primary" onClick={notify}>
            Book ticket
          </button>
          <Toaster />
        </div>
      </div>
    </div>
  </div>
</>


    </div> 
    :
      <div className="row cards col-sm-12">
      {shows?.map((s) => (
        <div className="card" style={{ width: "18rem" }} key={s.show.id}>
          <img key={s.show.id} src={s.show.image?.medium} alt={s.show.name} />
          <div className="card-body">
            <h5 className="card-title">{s.show.name}</h5>
            <p className="card-text">

            </p>
            <button className="btn btn-primary" onClick={()=>HandleClick(s)}>
                More Details
            </button>
          </div>
        </div>
      ))}
      </div>
}
        {/* {selected && isSelected && <Details />} */}
        
    </>
   
  );

};

export default Home;
