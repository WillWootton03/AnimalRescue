
interface PetTagProps {
    title: string;
}

export default function PetTag({
    title
} : PetTagProps) {
    return (
        <div className="bg-gray-100 text-black/50 rounded-lg px-2 py-1 text-sm">
            {title}
        </div>
    )
}