import React from "react";
import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { Select, SelectItem } from "@nextui-org/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import axios from "axios";
import moment from "moment";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

const Transaction = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const [edit, setEdit] = useState(false);
  const [editType, setEditType] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [transId, setTransId] = useState("");
  const [capital, setCapital] = useState(0);
  const [userName, setUserName] = useState("");
  const [transaction, setTransaction] = useState([]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const email = localStorage.getItem("userId");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/?email=${email}`
        );
        const result = response.data.filter(
          (item: { email: string | null }) => item.email === email
        );

        setCapital(result[0].capital);
        setUserName(capitalizeFirstLetter(result[0].name));
        setId(result[0]._id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/transactions/`);

        const result = response.data.filter(
          (trans: { user: string }) => trans.user === id
        );

        let totalAmount = 0;

        for (let transaction of result) {
          if (transaction.type === "income") {
            totalAmount += transaction.amount;
          } else if (transaction.type === "expense") {
            totalAmount -= transaction.amount;
          }
        }
        setCapital(totalAmount);
        setTransaction(result);
        setShouldFetchData(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (shouldFetchData && id) {
      fetchData();
    }
  }, [id, shouldFetchData]);

  const header = ["Date", "Type", "Amount", "Description", "Edit", "Delete"];

  const handleSignOut = () => {
    localStorage.removeItem("JWT");
    window.location.href = "/";
  };

  useEffect(() => {
    if (edit === false) {
      setType("");
      setAmount("");
      setDescription("");
    }
  }, [edit]);

  const handleCreateTransaction = async () => {
    setEdit(false);
    try {
      await axios.post("http://localhost:3000/transactions/", {
        user: id,
        type,
        amount: parseFloat(amount),
        description,
      });

      setShouldFetchData(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.patch(`http://localhost:3000/transactions/${transId}`, {
        type: editType,
        amount: parseFloat(editAmount),
        description: editDescription,
      });

      setShouldFetchData(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTransaction = (
    id: string,
    type: string,
    amount: string,
    description: string
  ) => {
    setTransId(id);
    setEditType(type);
    setEditAmount(amount);
    setEditDescription(description);
    setEdit(true);
    onOpen();
  };

  const handleDelete = async (id: string) => {
    try {
      const alertConfirmDelete = window.confirm(
        "Desea eliminar la transaccion?"
      );

      if (alertConfirmDelete) {
        await axios.delete(`http://localhost:3000/transactions/${id}`);
        setShouldFetchData(true);
      } else {
        window.alert("Transaccion no eliminada");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const itemSelect = ["income", "expense"];

  return (
    <div>
      <h1 className="text-center mt-4 font-bold">FINANCIAL TRANSACTIONS</h1>
      <div className="flex flex-col justify-around">
        <div>
          <Avatar
            className="w-64 h-64 text-tiny mx-auto my-5"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
          <h2 className="text-center">
            <b>CURRENT AMOUNT: </b>

            {"$" + capital}
          </h2>
        </div>
        <h2 className="font-bold mx-auto">User Name: {userName} </h2>
        <>
          <Button
            color="primary"
            onPress={() => {
              setEdit(false);
              onOpen();
            }}
          >
            Add Transaction
          </Button>
          <Modal
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add Transaction
                  </ModalHeader>
                  {edit ? (
                    <ModalBody>
                      <Select
                        key={editType}
                        className="max-w-xs"
                        label="Select name transaction"
                        selectedKeys={[editType]}
                        onChange={(e) => setEditType(e.target.value)}
                      >
                        {itemSelect.map((item) => (
                          <SelectItem key={item}>{item}</SelectItem>
                        ))}
                      </Select>

                      <input
                        defaultValue={editAmount}
                        placeholder="Amount"
                        type="number"
                        onChange={(e) => setEditAmount(e.target.value)}
                      />
                      <input
                        defaultValue={editDescription}
                        placeholder="Description"
                        type="text-area"
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    </ModalBody>
                  ) : (
                    <ModalBody>
                      <Select
                        className="max-w-xs"
                        label="Select name transaction"
                        onChange={(e) => setType(e.target.value)}
                      >
                        {itemSelect.map((item) => (
                          <SelectItem key={item}>{item}</SelectItem>
                        ))}
                      </Select>

                      <input
                        defaultValue=""
                        placeholder="Amount"
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <input
                        defaultValue=""
                        placeholder="Description"
                        type="text-area"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </ModalBody>
                  )}
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => {
                        onClose();
                        edit ? handleEdit() : handleCreateTransaction();
                      }}
                    >
                      {edit ? "Edit" : "Create"}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          {header.map((item) => (
            <TableColumn key={item}>{item}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {transaction &&
            transaction.map((item: any) => (
              <TableRow key={item._id}>
                <TableCell>
                  {moment(item.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Button
                    color="warning"
                    onClick={() =>
                      handleEditTransaction(
                        item._id,
                        item.type,
                        item.amount,
                        item.description
                      )
                    }
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button color="danger" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Button
        className="mt-5"
        color="primary"
        variant="flat"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Transaction;
