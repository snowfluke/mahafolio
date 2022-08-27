import { SEMESTER2, STUDY } from "../../utils/constant";
import Dropdown from "../form/dropdown";

function HeroBio(props) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col flex-[0.4] responsive-text">
        <Show
          when={props.edit}
          fallback={
            <>
              <span autoCapitalize="words">{props.study}</span>
              <span autoCapitalize="words">SEMESTER {props.semester}</span>
            </>
          }
        >
          <Dropdown
            items={STUDY}
            name="study"
            ref={props.refStudy}
            selected={props.study}
          />
          <Dropdown
            items={SEMESTER2}
            name="semester"
            ref={props.refSemester}
            selected={props.semester}
          />
        </Show>
      </div>
      <div className="text-right flex-[0.6] justify-end items-center">
        <Show
          when={props.edit}
          fallback={
            <span className="italic responsive-text truncate">{props.bio}</span>
          }
        >
          <textarea
            name="bio"
            minLength={10}
            spellCheck={false}
            rows={3}
            className="w-full resize-none bg-transparent italic border-t-2 border-green text-right"
            maxLength={200}
          >
            {props.bio}
          </textarea>
        </Show>
      </div>
    </div>
  );
}
export default HeroBio;
