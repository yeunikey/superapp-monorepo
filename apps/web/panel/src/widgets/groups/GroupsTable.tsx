import { useGroups } from "@/entities/data/model/useGroups";
import { useGroupStore } from "@/features/users/model/useGroupStore";
import GroupItem from "./GroupItem";

function GroupsTable() {

    const { groups } = useGroups();
    const { searchText } = useGroupStore();

    return (
        <div className="mt-12 bg-white rounded-4xl flex flex-col">

            <div className="py-6 px-6 flex flex-row">
                <div className="text-secondary min-w-lg">
                    Название
                </div>
                <div className="tset">

                </div>
            </div>

            <div className="flex justify-center">
                <div className="bg-background w-[95%] h-0.5" />
            </div>

            {groups
                .filter(u => (u.name).toLowerCase().includes(searchText.toLowerCase()))
                .map((group) => <GroupItem group={group} key={group.id} />)
            }
        </div>
    );
}

export default GroupsTable;