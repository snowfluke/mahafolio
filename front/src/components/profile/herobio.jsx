import { SEMESTER2, STUDY } from "../../utils/constant";
import { capitalize } from "../../utils/string";
import Dropdown from "../form/dropdown";

function HeroBio(props) {
  return (
    <div className="flex items-center space-x-4 pb-6">
      <div className="flex flex-col flex-[0.4] sm:flex-[0.6] responsive-text space-y-2">
        <Show
          when={props.edit}
          fallback={
            <>
              <span autoCapitalize="words">{capitalize(props.study)}</span>
              <span autoCapitalize="words">Semester {props.semester}</span>
            </>
          }
        >
          <Dropdown
            firstValue="Pilih jurusan"
            items={STUDY}
            name="study"
            selected={props.study}
          />
          <Dropdown
            firstValue="Pilih semester"
            items={SEMESTER2}
            name="semester"
            selected={props.semester}
          />
        </Show>
      </div>
      <div className="text-right flex-[0.6] sm:flex-[0.4] justify-end items-center responsive-text">
        <Show
          when={props.edit}
          fallback={<span className="italic responsive-text">{props.bio}</span>}
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
