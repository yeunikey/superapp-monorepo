"use client";;

import NewGroupModal from "@/features/groups/ui/NewGroupModal";
import EditUserModal from "@/features/users/ui/EditUserModal";
import View from "@/shared/ui/View";
import { useAuth } from "@/entities/data/model/useAuth";
import { useEffect } from "react";
import GroupControls from "@/widgets/groups/GroupControls";
import GroupsTable from "@/widgets/groups/GroupsTable";
import { fetchGroups } from "@/features/users/model/usersService";
import EditGroupModal from "@/features/groups/ui/EditGroupModal";

export default function Groups() {

  const { token } = useAuth();

  useEffect(() => {
    fetchGroups()
  }, [token])

  return (
    <View>

      {/* Modals */}
      <NewGroupModal />
      <EditGroupModal />

      {/* Content */}
      <div className="text-3xl font-semibold text-dark">
        Управление группами
      </div>

      <GroupControls />
      <GroupsTable />

    </View>
  );
}
