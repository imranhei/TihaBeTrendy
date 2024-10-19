import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllUsers,
  updateUser,
  deleteUser,
} from "@/store/admin/user-slice";
import { deleteAccount } from "@/store/auth-slice";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eye, Save, Trash2 } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { userRoleOptions, userRoleMap } from "@/config";

const Users = () => {
  const dispatch = useDispatch();
  const { userList, isLoading } = useSelector((state) => state.adminUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [editedUsers, setEditedUsers] = useState([]);
  const { toast } = useToast();

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleString("en-US", options).replace(",", "");
  };

  const handleRoleChange = (id, newRole) => {
    setEditedUsers((prevEdits) => {
      const existingEdit = prevEdits.find((edit) => edit.id === id);
      if (existingEdit) {
        return prevEdits.map((edit) =>
          edit.id === id ? { ...edit, role: newRole } : edit
        );
      } else {
        return [...prevEdits, { id, role: newRole }];
      }
    });
  };

  const handleDelete = (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"));

    dispatch(deleteAccount({ id, token })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllUsers());
        setIsModalOpen(false);
        setDeleteId(null);
        toast({
          title: "User Deleted Successfully",
        });
      } else {
        toast({
          title: data?.payload?.error || "Failed to Delete User",
          type: "destructive",
        });
      }
    })
    .catch((error) => {
      // Catch any other unforeseen errors
      console.log("Error:", error);
      toast({
        title: "An unexpected error occurred",
        type: "error",
      });
    });
  };

  const handleUpdateRole = (id, role) => {
    dispatch(updateUser({ id, role })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllUsers());
        setEditedUsers((prevEdits) =>
          prevEdits.filter((edit) => edit.id !== id)
        );
        toast({
          title: "User Role Updated Successfully",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="bg-background rounded-lg sm:p-6 p-4 shadow-md">
      <h1 className="text-center py-4 sm:text-3xl text-xl font-bold">
        User List
      </h1>
      <Table>
        <TableHeader>
          <TableRow className="p-0 text-nowrap bg-muted">
            <TableHead>Serial</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="w-24 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList?.map((user, index) => (
            <TableRow key={index} className="text-nowrap">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>
                <Select
                  value={
                    editedUsers.find((edit) => edit.id === user?._id)?.role ||
                    user?.role ||
                    ""
                  }
                  onValueChange={(newRole) =>
                    handleRoleChange(user?._id, newRole)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {userRoleOptions.map((role, index) => (
                        <SelectItem key={index} value={role?.id}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {user?.lastLogin ? formatDateTime(user?.lastLogin) : null}
              </TableCell>
              <TableCell className="text-nowrap">
                {user?.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="text-center flex gap-2 justify-center items-center lg:mt-2 sm:mt-1 mt-px">
                <Eye size={20} className="text-teal-500" />
                <Trash2
                  onClick={() => {
                    setIsModalOpen(true);
                    setDeleteId(user?._id);
                    setUserName(user?.name);
                  }}
                  size={20}
                  className="text-red-500"
                />
                {editedUsers.some(
                  (edit) => edit.id === user?._id && edit.role !== user?.role
                ) && (
                  <Save
                    size={20}
                    className="text-blue-500"
                    onClick={() =>
                      handleUpdateRole(
                        user?._id,
                        editedUsers.find((edit) => edit.id === user?._id)?.role
                      )
                    }
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="py-2" colSpan={7}>
              Showing {userList?.length} of {userList?.length} users
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Dialog
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
          setDeleteId(null);
          setUserName(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-primary">{userName}</span> Id?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row flex-wrap justify-center sm:gap-6 gap-4">
            <DialogClose asChild className="sm:w-32 w-24">
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              className="sm:w-32 w-24"
              onClick={() => handleDelete(deleteId)}
              type="button"
              variant="destructive"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
