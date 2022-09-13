import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useChatContext } from 'stream-chat-react';
import Axios from 'axios';

const RegisterTable = ({setIsVisualising}) => {
  const [anmeldungenList, setAnmeldungenList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowStat, setSelectedRowStat] = useState([]);
  const {client} = useChatContext();

  const adminList = [
    "40a45ef8f30fc503feb5fd1b2ef620e6",
  ]

  const columns = [
     { field: 'id', headerName: 'ID', width: 70 },
     { field: 'Student', headerName: 'Student Name', width: 130 },
     { field: 'Fach', headerName: 'Fach', width: 80 },
     { field: 'Datum', headerName: 'Datum', type:'date', width: 110 },
     { field: 'DateiName', headerName: 'DateiName', width: 130 },
     { field: 'Seite', headerName: 'Seite', type: 'number',width: 90 },
     { field: 'Beschreibung', headerName: 'Beschreibung', width: 360 },
     { field: 'Status', headerName: 'Status', width: 130 },
   ];

  //select and unselect rows
  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => anmeldungenList.find((row) => row.id === id));
    const selectedRowsIdArr = selectedRowsData.map((val)=>{ return val.id});
    const selectedRowsStatArr = selectedRowsData.map((val)=>{ return val.Status});
    console.log(selectedRowsIdArr);
    console.log(selectedRowsStatArr);
    setSelectedRows(selectedRowsIdArr);
    setSelectedRowStat(selectedRowsStatArr);
  };

  const deleteRegistration = (ids) =>{
    if(ids.length){
      for(let i = 0; i < ids.length; i++){
        Axios.delete(`http://localhost:3001/api/delete/${ids[i]}`)
      }
      alert(`Zeilen mit ID: ${selectedRows} entfernt`);
    }
  }

  const updateStatus = (ids, stat) =>{
    if(ids.length){
      for(let i = 0; i < ids.length; i++){
        if(stat[i] == 'NEU'){
          Axios.put(`http://localhost:3001/api/update/${ids[i]}`, {Status: 'IM BEARBEITUNG'})
        } else if(stat[i] == 'IM BEARBEITUNG'){
          Axios.put(`http://localhost:3001/api/update/${ids[i]}`, {Status: 'AKZEPTIERT'})
        } else {
          continue;
        } 
      }
      alert(`Status bei Zeilen mit ID: ${selectedRows} sktualisiert`);
    }
  }

  const rejectRegistration = (ids) =>{
    if(ids.length){
      for(let i = 0; i < ids.length; i++){
        Axios.put(`http://localhost:3001/api/update/${ids[i]}`, {Status: 'ABGELEHNT'})
      }
      alert(`Zeilen mit ID: ${selectedRows} abgelehnt`);
    }
  }

  //useEffect hook to get items from db
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      setAnmeldungenList(response.data);
    })
  }, []) 


  return (
    <div>
      {adminList.includes(client.userID)? 
        <div>
          <div className='register-channel-header__container'>Anmeldungen</div>
          <div className='register__form-container'>
            <div className='auth__form-container_fields'>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  className='register-table__grid-content'
                  rows={anmeldungenList}
                  onSelectionModelChange={(ids)=>onRowsSelectionHandler(ids)}
                  columns={columns} 
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  />
              </div>
            </div>
          </div>
          {console.log(`this is : ${selectedRows}`)}
          {console.log(`this statuses : ${selectedRowStat}`)}
          {console.log(client.userID)}
          <div className='register-channel-footer__container'>
            <button className = 'team-channel__registration-button__return' onClick={()=>{if(setIsVisualising){setIsVisualising((prevState)=> !prevState)}}}>Anmeldungen</button>
            <button className = 'team-channel__status-change-button' onClick={()=>{updateStatus(selectedRows, selectedRowStat)}}>Status andern</button>
            <button className = 'team-channel__deny-button__return' onClick={()=>{rejectRegistration(selectedRows)}}>Ablehnen</button>
            <button className = 'team-channel__delete-button__return' onClick={()=>{deleteRegistration(selectedRows)}}>Loschen</button>
          </div>
        </div> : 
        <div>
        <div className='register-channel-header__container'>Anmeldungen</div>
        <div className='register__form-container'>
          <div className='auth__form-container_fields'>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                className='register-table__grid-content'
                rows={anmeldungenList}
                onSelectionModelChange={(ids)=>onRowsSelectionHandler(ids)}
                columns={columns} 
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                />
            </div>
          </div>
        </div>
        {console.log(`this is : ${selectedRows}`)}
        {console.log(`this statuses : ${selectedRowStat}`)}
        {console.log(client.userID)}
        <div className='register-channel-footer__container'>
          <button className = 'team-channel__registration-button__return' onClick={()=>{if(setIsVisualising){setIsVisualising((prevState)=> !prevState)}}}>Anmeldungen</button>
        </div>
      </div>}
    </div>
  )
}

{/* <div className='register-channel-header__container'>Anmeldungen</div>
      <div className='register__form-container'>
        <div className='auth__form-container_fields'>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              className='register-table__grid-content'
              rows={anmeldungenList}
              onSelectionModelChange={(ids)=>onRowsSelectionHandler(ids)}
              columns={columns} 
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              />
          </div>
        </div>
      </div>
      {console.log(`this is : ${selectedRows}`)}
      {console.log(`this statuses : ${selectedRowStat}`)}
      {console.log(client.userID)}
      <div className='register-channel-footer__container'>
        <button className = 'team-channel__registration-button__return' onClick={()=>{if(setIsVisualising){setIsVisualising((prevState)=> !prevState)}}}>Anmeldungen</button>
        <button className = 'team-channel__status-change-button' onClick={()=>{updateStatus(selectedRows, selectedRowStat)}}>Status andern</button>
        <button className = 'team-channel__deny-button__return' onClick={()=>{rejectRegistration(selectedRows)}}>Ablehnen</button>
        <button className = 'team-channel__delete-button__return' onClick={()=>{deleteRegistration(selectedRows)}}>Loschen</button>
      </div> */}

export default RegisterTable