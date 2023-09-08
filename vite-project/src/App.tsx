import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "./components/ui/table";
import { Input } from "./components/ui/input";
import { Checkbox } from "./components/ui/checkbox";
import { Label } from "./components/ui/label";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <header>
        <nav className="flex">
          <div className="font-bold">Library</div>
        </nav>
      </header>
      <main>
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-6 items-center">
            <Input type="text" placeholder="Book Title"></Input>
            <Input type="text" placeholder="Author"></Input>
            <Input type="number" placeholder="Pages"></Input>
            <div className="flex-shrink-0">
              <Checkbox id="read" className="mr-1"></Checkbox>
              <Label htmlFor="read">I have read the book</Label>
            </div>
          </div>
          <Button className="bg-blue-700">Add to Library</Button>
        </div>
        <div>
          <Table>
            <TableCaption>A list of books in the library.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Pages</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  To Kill a Mockingbird
                </TableCell>
                <TableCell>Harper Lee</TableCell>
                <TableCell>281</TableCell>
                <TableCell>Yes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}

export default App;
