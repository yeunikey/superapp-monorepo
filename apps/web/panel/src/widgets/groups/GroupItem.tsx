import { Group } from "@/entities/data/types/group";
import { useEditGroupModal } from "@/features/groups/model/useEditGroupModal";
import { useGroupStore } from "@/features/users/model/useGroupStore";

type GroupProps = {
    group: Group;
}

function GroupItem({ group }: GroupProps) {

    const { setEditModal } = useGroupStore();
    const { setGroup } = useEditGroupModal();

    return (
        <div >
            <div className="py-4 px-6 flex flex-row">

                <div className="flex gap-4 items-center min-w-lg">
                    <div className="text-lg font-semibold text-dark">
                        {group.name}
                    </div>
                </div>

                <div className="grow items-center">
                    <div className="flex justify-end">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background cursor-pointer"
                            onClick={() => {
                                setEditModal(true);
                                setGroup(group);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9BA3AE"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="bg-background w-[95%] h-0.5" />
            </div>
        </div>
    );
}

export default GroupItem;