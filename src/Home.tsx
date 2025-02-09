import { useNavigate } from "react-router-dom";
import logo1 from "./assets/logo1.png";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "./Firebase/configs";

function Home() {

    const navigate = useNavigate();

    // Function to delete the entire Firestore collection
    async function deleteEntireCollection() {
        const vedio2CollectionRef = collection(db, "vedio2"); // Reference to the "user" collection
        try {
            const querySnapshot = await getDocs(vedio2CollectionRef); // Fetch all documents in the collection

            // Delete each document one by one
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref); // Delete the document
                console.log(`Document with ID ${doc.id} deleted.`);
            });

            console.log("Entire collection deleted.");
            alert("Entire collection deleted successfully!");
            navigate('/');
        } catch (error) {
            console.error("Error deleting collection: ", error);
            alert("Error deleting collection!");
        }
    }


    return (
        <main className="flex w-screen min-h-screen flex-col items-center justify-start bg-[#090951] pb-[50px] md:pb-0 px-4">
            <img
                src={logo1}
                alt="Flowbite Logo"
                className="h-64  w-auto "
            />
            

            {/* Buttons for reset and display */}
            <div className="grid grid-cols-3 gap-4 mt-8">
                <button
                    className="text-2xl font-bold text-black text-center mt-4 bg-[#B5B89F] h-16 w-32 rounded-md"
                    onClick={deleteEntireCollection}
                >
                    إعادة البدء
                </button>
                <button
                    className="text-2xl font-bold text-black text-center my-4 bg-[#B5B89F] h-16 w-36 rounded-md"
                    onClick={() => navigate('/desplay')}
                >
                    شاشة العرض
                </button>
                <button
                    className="text-2xl font-bold text-black text-center my-4 bg-[#B5B89F] h-16 w-36 rounded-md"
                    onClick={() => navigate('/hero')}
                >
                    شاشة الأمير 
                </button>
            </div>
        </main>
    );
}

export default Home;