import * as grpcweb from 'grpc-web';
import { ghostClient } from '../generated/ghost_grpc_web_pb';
import { diskRequest, definitionRequest, ghostRequest, interactiveRequest, APIResponse, Empty } from '../generated/ghost_pb';
import { signin  } from '../actions';


const enovyUrl = 'localhost'
const springUrl = 'http://localhost:8080'


export const fetchUser = async (form, open, setRender, history, dispatch) => {
    const response = await fetch(springUrl+'/api/getUser',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_name: form.username })
    });
    try{
      const data = await response.json();
      if (data.password === form.password) {
        dispatch(signin(form.username)); 
        history.push('/ghost')
      }else{
        setRender(privOpen => {
          return {...open,
            isOpen: !open.isOpen,
            severity: 'info',
            message: 'Password is wrong' 
          }
        });
      }
    }catch(error){
      console.log("fetchUser catch 1 : "+ error)
      setRender(privOpen => {
        return {...open,
          isOpen: !open.isOpen,
          severity: 'warning',
          message: 'User is not founded' 
        }
      });
    };
};

export const fetchLock = async ( setRender ) => {
    const response = await fetch(springUrl+'/api/getLock',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    try{
      const data = await response.json();
      if(data.length !== 0 ){
        setRender(data)
      }

    }catch(error){
      console.log("fetchLock catch 1 : "+ error)
    };
};

export const requireLock = async prop => {
  const { form, login, setReserve, setGhostLock, setGrpcPort, setAlertOpen } = prop
  const response = await fetch(springUrl+'/api/requireLock',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ghost_host: form.ghosthost, user_name: login.user_name })
  });
  try{
    const data = await response.json();
    setReserve(data)
  }catch(error){
    //alert("requireLock 1: Message is not defined.")
    //setAlertOpen(prop => { return  {...prop, isOpen : true, handlerName: "requireLock" , message: "1. Message is not defined"}})
    console.log("requireLock catch 1 : "+ error)
  };

  const responseGetLock = await fetch(springUrl+'/api/getLock',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ghost_host: form.ghosthost, user_name: login.user_name })
  });
  try{
    const data = await responseGetLock.json();
    setGhostLock(data)

  }catch(error){
    //alert("requireLock 2 : Message is not defined.")
    //setAlertOpen(prop => { return  {...prop, isOpen : true, handlerName: "requireLock" , message: "2. Message is not defined"}})
    console.log("requireLock catch 2 : "+ error)
  };

  const responseGetGrpcPort = await fetch(springUrl+'/api/getGrpcPort',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ghost_host: form.ghosthost, user_name: login.user_name })
  });
  try{
    const data = await responseGetGrpcPort.json();
    setGrpcPort(data.envoy_port)

  }catch(error){
    //alert("requireLock error 3 : Check Ghost Host.")
    console.log("requireLock catch 3 : "+ error)
    setAlertOpen(prop => { return  {...prop, isOpen : true, handlerName: "requireLock" , message: "Check Ghost Host"}})
  };

};


export const releaseLock = async ( form, login, setResetReservender, setGhostLock ) => {
  const response = await fetch(springUrl+'/api/releaseLock',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ghost_host: form.ghosthost, user_name: login.user_name })
  });
  try{
    const data = await response.json();
    console.log('releaseLock')
    console.log(data)
    if(setResetReservender && data){setResetReservender(!data)}
    
  }catch(error){
    console.log("releaseLock catch 1 : "+ error)
  };

  const responseGetLock = await fetch(springUrl+'/api/getLock',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ghost_host: form.ghosthost, user_name: login.user_name })
  });
  try{
    const data = await responseGetLock.json();
    console.log('getLock')
    console.log(data)
    setGhostLock(data)

  }catch(error){
    console.log("releaseLock catch 2 : "+ error)
  };
};




export const updatePassword = async prop => {
  const { form, login, setOpen } = prop
  if (form.new_password !== form.confirm_password) { 
    setOpen(prop =>{return {...prop, isOpen: true, severity : "warning", message : "Please type same password in confirm password"}}) 
  }else {
    const response = await fetch(springUrl+'/api/updatePassword',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_name: login.user_name, password : form.password, new_password : form.new_password })
    })
    try{
      const data = await response.json();
      data === 1 ? setOpen(prop =>{return {...prop, isOpen: true, severity : "info", message: "Password update sucessful."}}) :
        setOpen(prop =>{return {...prop, isOpen: true, severity : "warning", message: "Password update Failed."}})
    }catch(error){
      console.log("updatePassword catch 1 : "+ error)
    };    
  }
};


export const fetchGrpcDiskSize = async( setRender, form, grpcPort) => {
  const ghostclient_ = new ghostClient("http://"+enovyUrl+":"+grpcPort, null, null);
  const diskRequest_ = new diskRequest();
  diskRequest_.setDir(form.dir);
  try{
    await ghostclient_.diskcheck(diskRequest_,{},( err = grpcweb.Error, APIResponse) => {
      console.log('Grpc disk size error : '+err)
      APIResponse !== null ? setRender(APIResponse.getResponsemessage()) : setRender('Disk size is not available')
    });
  }catch(e){
    console.log("fetchGrpcDiskSize catch 1 : "+ e)
  }
};


export const fetchGrpcTableDefinition = async( setRender, form, grpcPort) => {
  const ghostclient_ = new ghostClient("http://"+enovyUrl+":"+grpcPort, null, null);
  const definitionRequest_ = new definitionRequest()
  definitionRequest_.setSchemaname(form.schemaname);
  definitionRequest_.setTablename(form.tablename);
  await ghostclient_.checkdefinition(definitionRequest_,{},( err = grpcweb.Error, APIResponse) => {
      console.log('Grpc table definition error : '+err)
      APIResponse !== null ? setRender(APIResponse.getResponsemessage().split("\n")) : setRender(['Table definition is not available'])
  });
};

export const fetchGrpcGhostDryrun = async( setRender, form, grpcPort) => {
  const ghostclient_ = new ghostClient("http://"+enovyUrl+":"+grpcPort, null, null);
  const ghostRequest_ = new ghostRequest();
  ghostRequest_.setSchemaname(form.schemaname);
  ghostRequest_.setTablename(form.tablename);
  ghostRequest_.setStatement(form.statement);
  await ghostclient_.dryrun(ghostRequest_,{},( err = grpcweb.Error, APIResponse) => {
      console.log('Grpc dryrun err : '+err)
      APIResponse !== null ? setRender(APIResponse.getResponsemessage().split("\n")) : setRender(['Dry Run is not available'])
  });
};


//alter
export const fetchGrpcGhostExecute = async prop => {
  const {setExecuteResult, form, grpcPort } = prop
  const ghostclient_ = new ghostClient("http://"+enovyUrl+":"+grpcPort, null, null);
  const ghostRequest_ = new ghostRequest();
  ghostRequest_.setSchemaname(form.schemaname);
  ghostRequest_.setTablename(form.tablename);
  ghostRequest_.setStatement(form.statement);
  await ghostclient_.executeNohup(ghostRequest_,{},( err = grpcweb.Error, APIResponse) => {
      console.log('Grpc execute err : '+err)
      APIResponse !== null ? setExecuteResult(APIResponse.getResponsemessage()) : setExecuteResult('Execute is not available')
  });
};

export const fetchGrpcGhostInteractive = async( setRender, form, grpcPort) => {
  const ghostclient_ = new ghostClient("http://"+enovyUrl+":"+grpcPort, null, null);
  const interactiveRequest_ = new interactiveRequest();
  interactiveRequest_.setSchemaname(form.schemaname);
  interactiveRequest_.setTablename(form.tablename);
  interactiveRequest_.setGhostcommand(form.ghostcommand);
  await ghostclient_.interactive(interactiveRequest_,{},( err = grpcweb.Error, APIResponse) => {
      console.log('Grpc interactive err : '+err)
      APIResponse !== null ? setRender(APIResponse.getResponsemessage().split("\n")) : setRender(['Interactive is not available'])
  });
};

export const fetchGrpcGhostCutover = async( setRender, form, grpcPort ) => {
  const ghostclient_ = new ghostClient("http://"+enovyUrl+":"+grpcPort, null, null);
  const emptyRequest_ = new Empty();
  await ghostclient_.cutover(emptyRequest_,{},( err = grpcweb.Error, APIResponse) => {
      console.log('Grpc cutover err : '+err)
      APIResponse !== null ? setRender('Cut over completed') : setRender('Cut over is not available')
  });
};
