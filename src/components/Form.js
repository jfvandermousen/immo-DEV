import React from 'react'
import axios from 'axios'



export default class Form extends React.Component {

    
  state =  {
    'area': 0,'property-type': "HOUSE", 'rooms-number': 0,
    'zip-code' : 1000,'equipped-kitchen':false,"open-fire" : false,
     "terrace" : false,"terrace-area": 0, "prediction" : 0, 
    'checked-terrace' : false,'garden': false,'checked-garden' : false,
    'garden-area' : 0 ,'facades-number': 0,'swimming-pool': false,
    'checked-facades': "APARTMENT", 'building-state':"NEW"
};



    onAreaChange = e => {
      this.setState({
        'area': e.target.value,  
      });
    };

    onTerraceAreaChange = e => {
        this.setState({
          'terrace-area': e.target.value,  
        });
      };
      onGardenAreaChange = e => {
        this.setState({
          'garden-area': e.target.value,  
        });
      };


      onFacadesChange = e => {
        this.setState({
            'facades-number': e.target.value,  
        });
      };
      onRoomsNumberChange = e => {
        this.setState({
            'rooms-number': e.target.value,  
        });
      };
      onZipCodeChange = e => {
        this.setState({
            'zip-code': e.target.value,  
        });
      }; 
      onBuildingChange = e => {
        this.setState({
            'building-state': e.target.value,  
        });
      }; 

      onKitchenChange = () => {
        this.setState(initialState => ({
          'equipped-kitchen': !initialState['equipped-kitchen'],
            }));
         }
         onFireChange = () => {
          this.setState(initialState => ({
            'open-fire': !initialState['open-fire'],
              }));
           }
           onSwimmingChange = () => {
            this.setState(initialState => ({
              'swimming-pool': !initialState['swimming-pool'],
                }));
             }
           onTerraceChange = () => {
            this.setState(initialState => ({
              'terrace': !initialState['terrace'],
              'checked-terrace': !initialState['checked-terrace'],
                }));
             }
             onGardenChange = () => {
                this.setState(initialState => ({
                  'garden': !initialState['garden'],
                  'checked-garden': !initialState['checked-garden'],
                    }));
                 }

                 onPropertyChange = e => {
                    this.setState(initialState => ({
                        'property-type': e.target.value,  
                        'checked-facades': !initialState['checked-facades'],
                    }));
                  };


         

      onPredictionChange = e => {
        this.setState({
            'prediction': e.target.value,  
        });
      };


    handleSubmit = e => {
      e.preventDefault();

      const data = {
        'area' : parseInt(this.state['area']),
        'property-type': this.state['property-type'],
        'rooms-number': parseInt(this.state['rooms-number']),
        'zip-code' : parseInt(this.state['zip-code']),
        'prediction':parseInt(this.state['prediction']),
        'equipped-kitchen':Boolean(this.state['equipped-kitchen']),
        'open-fire':Boolean(this.state['open-fire']),
        'terrace':Boolean(this.state['terrace']),
        'garden':Boolean(this.state['garden']),
        'terrace-area' : parseInt(this.state['terrace-area']),
        'garden-area' : parseInt(this.state['garden-area']),
        'facades-number' : parseInt(this.state['facades-number']),
        'swimming-pool':Boolean(this.state['swimming-pool']),
        'building-state' : parseInt(this.state['building-state']),
        
    };

    console.log({data})


axios({
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    url: 'https://app-becode.herokuapp.com/predict',
    data: {data: data}
  }).then(res=>{
    console.log(res);
    this.setState({prediction: res.data.prediction});

  })
  .catch(err => console.log(err));
  };



  render() {
    const terraceContent = this.state['checked-terrace' ]
    ? <div className="flex flex-col items-center  w-full bg-teal-lighter">  <label >Terrace Area</label> 
    <input   className="w-full mb-2 border-2 border-indigo-300 py-2 px-3 text-grey-darkest"    type="number"  value={this.state['terrace-area']} onChange={this.onTerraceAreaChange}/>
    </div>
    : null;
    const gardenContent = this.state['checked-garden' ]
    ? <div className="flex flex-col items-center  w-full bg-teal-lighter">  <label >Garden Area</label> 
    <input   className="w-full mb-2 border-2 border-indigo-300 py-2 px-3 text-grey-darkest"    type="number" value={this.state['garden-area']} onChange={this.onGardenAreaChange}/>
    </div>
    : null;
    const facadesContent = this.state['checked-facades' ]
    ? <div className="flex flex-col items-center  w-full bg-teal-lighter"> 
    <label >Number of facades</label> 
        <select className="border-2 border-indigo-300 py-2 px-3 text-grey-darkest" value={this.state['facades-number']} onChange={this.onFacadesChange}>
            <option  name ="property-type">1</option>
            <option  name ="property-type">2</option>
            <option  name ="property-type">3</option>
            <option  name ="property-type">4</option>
        </select>
    </div>
    : null;

    return (
        <div className="anim container mt-10 flex flex-col items-center  w-full bg-teal-lighter">
            <form className="w-full flex flex-col items-cente shadow-xl " onSubmit={this.handleSubmit}>
            <label className=" label-left">What are you loooking for ?</label>

<select className="border-2 border-indigo-300 py-2 px-3 text-grey-darkest" value={this.state['property-type']} onChange={this.onPropertyChange}>
    <option  name ="property-type">HOUSE</option>
    <option  name ="property-type"> APARTMENT</option>
  </select>
        <label className="">Area</label>

      <input className="border-2 border-indigo-300 py-2 px-3 text-grey-darkest" type="number" min="20"  value={this.state['area']} onChange={this.onAreaChange} required/>

      {facadesContent}

      <div className="flex flex-col items-center  w-full bg-teal-lighter"> 
    <label >Building State</label> 
        <select className="border-2 border-indigo-300 py-2 px-3 text-grey-darkest" value={this.state['building-state']} onChange={this.onBuildingChange}>
            <option  name ="building-state">NEW</option>
            <option  name ="building-state">GOOD</option>
            <option  name ="building-state">TO RENOVATE</option>
            <option  name ="building-state">JUST RENOVATED</option>
            <option  name ="building-state">TO REBUILD</option>
        </select>
    </div>

        <label>Number of rooms</label>
        <input className="border-2 border-indigo-300 py-2 px-3 text-grey-darkest" type="number" min="1" value={this.state['rooms-number']} onChange={this.onRoomsNumberChange} required/>
        <label>Zipcode</label>
        <input className="mb-8 border-2 border-indigo-300 py-2 px-3 text-grey-darkest" type="text"  pattern="\d{4}" value={this.state['zip-code']} onChange={this.onZipCodeChange} required/>
        <label className="check">Equipped Kitchen
        <input
          type="checkbox"
          checked={this.state['equipped-kitchen']}
          onChange={this.onKitchenChange}
        />
      </label>
      <label className="check">Open Fire
        <input
          type="checkbox"
          checked={this.state['open-fire']}
          onChange={this.onFireChange}
        />

      </label>
      <label className="check">Terrace
        <input
          type="checkbox"
          checked={this.state['terrace'] }
          onChange={this.onTerraceChange}
        />

      </label>

      { terraceContent }
      <label className="check">Garden
        <input
          type="checkbox"
          checked={this.state['garden'] }
          onChange={this.onGardenChange}
        />

      </label>
      {gardenContent }
      <label className="check">Swimming pool
        <input
          type="checkbox"
          checked={this.state['swimming-pool'] }
          onChange={this.onSwimmingChange}
        />

      </label>
      <button className="w-full p-4 mt-8 btn btn-blue shadow-xl" type="submit">
          <p className=" text-2xl p-4">Search</p>
           </button>
    </form>

    <div className=" text-2xl mb-8 w-full mt-8 btn btn-blue prediction">
      <h2 className=" p-4">Our estimation is : {this.state.prediction}€</h2>
      </div>
    </div>


    )

  }
}