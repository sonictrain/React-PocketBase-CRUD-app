import { Chip } from "@material-tailwind/react";

const Version = () => {
    return (
        <Chip
            variant="ghost"
            className="fixed bottom-0 left-0 m-8 md:m-12 lg:m-20 w-max"
            color="amber"
            size="sm"
            value="refactor"
            icon={
                <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-amber-900 content-['']" />
            }
        />
    )
}

export default Version;