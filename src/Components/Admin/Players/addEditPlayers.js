import React, { Component } from 'react';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import AdminLayout from '../../../Hoc/AdminLayout';
import { firebasePlayers, firebasedb, firebase } from '../../../Firebase';
import { firebaselooper } from '../../ui/misc';
import Fileuploader from '../../ui/FileUploader';



export default class AddEditPlayers extends Component {

  state = {
    playerId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    defultImg: '',
    teams: [],
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'player name',
          name: 'name_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          label: 'player Last name',
          name: 'last_name_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      number: {
        element: 'input',
        value: '',
        config: {
          label: 'player number',
          name: 'number_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a position',
          name: 'select_position',
          type: 'select',
          options: [
            { key: "Keeper", value: "Keeper" },
            { key: "Defense", value: "Defense" },
            { key: "Midfield", value: "Midfield" },
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true
        },
        valid: false
      }
    }
  }

  updateFields=(player, playerId, type, defaultImg)=> {
    const newFormData = {... this.state.formdata};
    for(let key in newFormData){
      newFormData[key].value = player[key];
      newFormData[key].valid = true
    }

    this.setState({playerId: playerId, defaultImg,formType:type,formdata: newFormData})
  }

  componentDidMount() {
    const playerId = this.props.match.params.id;

    if (!playerId) {
      this.setState({
        formType: 'Add Player'
      })
    } else {
      this.setState({
        formType: 'Edit Player'
      })

      firebasedb.ref(`players/${playerId}`).once('value')
      .then(snapshot => {
        const playerData = snapshot.val();
        firebase.storage().ref('players')
        .child(playerData.image).getDownloadURL()
        .then(url => {
          this.updateFields(playerData,playerId,'Edit Player', url)
        }).catch(e=>{
          this.updateFields({...playerData,image:''},playerId,'Edit Player', '')   
        })
      })
    }
  }

  formSuccess = (message) => {
      this.setState({
        formSuccess: message
      })

      setTimeout(()=>{
        this.setState({formSuccess:''})
      }, 2000)

    }

  submitForm(event) {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }




    if (formIsValid) {
      if(this.state.formType === 'Edit Player'){

        firebasedb.ref(`players/${this.state.playerId}`)
        .update(dataToSubmit).then(()=>{
          this.formSuccess('updated Correctly')
        }).catch((e)=>{
          this.setState({formError:true})
        })


      }else{
        firebasePlayers.push(dataToSubmit).then(()=>{
          this.props.history.push('/admin_players')
        }).catch((e)=> {
          this.setState({formError: true})
        })
      }
      console.log(dataToSubmit);
      

    } else {
      console.log("here");

      this.setState({
        formError: true
      })
    }

  }


  updateForm(element,content='') {

    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };

    if(content === ''){
      newElement.value = element.event.target.value;
    }else {
      newElement.value = content
    }


    let validData = validate(newElement);


    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];


    newFormdata[element.id] = newElement;

    this.setState({
      formError: false,
      formdata: newFormdata,
      formSuccess: 'congratulation'
    });

    // this.successMessage();
  }

  resetImage = () => {
    const newFormdata = {... this.state.formdata};
    newFormdata['image'].value = '';
    newFormdata['image'].valid='';
    this.setState({
      defaultImg:'',
      formdata:newFormdata
    });

  }

  storeFileName = (filename) => {
    this.updateForm({id:'image'}, filename)
    
  }

  render() {
    console.log(this.state.formdata);
    return (
      <AdminLayout>

        <div className="editplayers_dialog_wrapper">
          <h2>
            {this.state.formType}
          </h2>

          <div>

            <Fileuploader
              dir="players"
              tag={"player image"}
              defaultImg={this.state.defaultImg}
              defaultImgName={this.state.formdata.image.value}
              resetImg={() => this.resetImage()}
              fileName={(fileName) => { this.storeFileName(fileName) }}
            />

            <form onSubmit={(event) => this.submitForm(event)}>
              <FormField id={'name'} formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
              />

              <FormField id={'lastname'} formdata={this.state.formdata.lastname}
                change={(element) => this.updateForm(element)}
              />

              <FormField id={'number'} formdata={this.state.formdata.number}
                change={(element) => this.updateForm(element)}
              />

              <FormField id={'position'} formdata={this.state.formdata.position}
                change={(element) => this.updateForm(element)}
              />

              <div className="success_label">
                {this.state.formSuccess}
              </div>

              {this.state.formError ? <div>
                Some thing went wrong
              </div> :
                ""
              }
              <div className="admin_submit">
                <button onClick={(event => this.submitForm(event))}>
                  {this.state.formType}
                </button>
              </div>

            </form>
          </div>

        </div>


      </AdminLayout>

    )
  }
}
