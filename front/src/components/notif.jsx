import { Switch } from "solid-js";

function Notif(props) {
  return (
    <Switch>
      <Match when={props.type == "success"}>
        <div className="fixed bottom-12 left-10 w-min-content text-green border-2 font-bold border-green px-4 py-2 bg-white shadow-md">
          ✅ {props.content}
        </div>
      </Match>
      <Match when={props.type == "error"}>
        <div className="fixed bottom-12 left-10 w-min-content text-red-500 border-2 font-bold border-red-500 px-4 py-2 bg-white shadow-md">
          ❌ {props.content}
        </div>
      </Match>
      <Match when={props.type == "warning"}>
        <div className="fixed bottom-12 left-10 w-min-content text-yellow-500 border-2 font-bold border-yellow-500 px-4 py-2 bg-white shadow-md">
          ⚠️ {props.content}
        </div>
      </Match>
    </Switch>
  );
}
export default Notif;
