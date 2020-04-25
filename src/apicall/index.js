import * as grpcweb from 'grpc-web';
import { ghostClient } from '../generated/ghost_grpc_web_pb';
import { diskRequest, definitionRequest, ghostRequest, interactiveRequest, APIResponse, Empty } from '../generated/ghost_pb';
import { signin } from '../actions';

const grpcPort = '10000'
const springUrl = 'http://localhost:8080'

export const fetchUser = async (form, open, setRender, history,dispatch) => {
    const response = await fetch(springUrl+'/api/getUser',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_name: form.username })
    })
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
    })
    try{
      const data = await response.json();
      console.log(data.length)
      if(data.length !== 0 ){
        setRender(data)
      }

    }catch(error){
      alert("No user founded")
    };
};

export const fetchGrpcDiskSize = async( setRender, form) => {
    const ghostclient_ = new ghostClient("http://"+form.ghosthost+":"+grpcPort, null, null);
    const diskRequest_ = new diskRequest();
    diskRequest_.setDir(form.dir);
    try{
      await ghostclient_.diskcheck(diskRequest_,{},( err = grpcweb.Error, APIResponse) => {
        console.log('Grpc disk size error : '+err)
        APIResponse !== null ? setRender(APIResponse.getResponsemessage()) : setRender('Disk size is not available')
      });
    }catch(e){
    }
};


export const fetchGrpcTableDefinition = async( setRender, form) => {
    const ghostclient_ = new ghostClient("http://"+form.ghosthost+":"+grpcPort, null, null);
    const definitionRequest_ = new definitionRequest()
    definitionRequest_.setSchemaname(form.schemaname);
    definitionRequest_.setTablename(form.tablename);
    await ghostclient_.checkdefinition(definitionRequest_,{},( err = grpcweb.Error, APIResponse) => {
        console.log('Grpc table definition error : '+err)
        APIResponse !== null ? setRender(APIResponse.getResponsemessage().split("\n")) : setRender(['Table definition is not available'])
  });
};

export const fetchGrpcGhostDryrun = async( setRender, form) => {
    const ghostclient_ = new ghostClient("http://"+form.ghosthost+":"+grpcPort, null, null);
    const ghostRequest_ = new ghostRequest();
    ghostRequest_.setSchemaname(form.schemaname);
    ghostRequest_.setTablename(form.tablename);
    ghostRequest_.setStatement(form.statement);
    await ghostclient_.dryrun(ghostRequest_,{},( err = grpcweb.Error, APIResponse) => {
        console.log('Grpc dryrun err : '+err)
        APIResponse !== null ? setRender(APIResponse.getResponsemessage().split("\n")) : setRender(['Dry Run is not available'])
  });
};

export const fetchGrpcGhostExecute = async( setRender, form) => {
    const ghostclient_ = new ghostClient("http://"+form.ghosthost+":"+grpcPort, null, null);
    const ghostRequest_ = new ghostRequest();
    ghostRequest_.setSchemaname(form.schemaname);
    ghostRequest_.setTablename(form.tablename);
    ghostRequest_.setStatement(form.statement);
    await ghostclient_.executeNohup(ghostRequest_,{},( err = grpcweb.Error, APIResponse) => {
        console.log('Grpc execute err : '+err)
        APIResponse !== null ? setRender(APIResponse.getResponsemessage()) : setRender('Execute is not available')
  });
};

export const fetchGrpcGhostInteractive = async( setRender, form) => {
    const ghostclient_ = new ghostClient("http://"+form.ghosthost+":"+grpcPort, null, null);
    const interactiveRequest_ = new interactiveRequest();
    interactiveRequest_.setSchemaname(form.schemaname);
    interactiveRequest_.setTablename(form.tablename);
    interactiveRequest_.setGhostcommand(form.ghostcommand);
    await ghostclient_.interactive(interactiveRequest_,{},( err = grpcweb.Error, APIResponse) => {
        console.log('Grpc interactive err : '+err)
        APIResponse !== null ? setRender(APIResponse.getResponsemessage().split("\n")) : setRender(['Interactive is not available'])
  });
};

export const fetchGrpcGhostCutover = async( setRender, form ) => {
    const ghostclient_ = new ghostClient("http://"+form.ghosthost+":"+grpcPort, null, null);
    const emptyRequest_ = new Empty();
    await ghostclient_.cutover(emptyRequest_,{},( err = grpcweb.Error, APIResponse) => {
        console.log('Grpc cutover err : '+err)
        APIResponse !== null ? setRender('Cut over completed') : setRender('Cut over is not available')
  });
};
