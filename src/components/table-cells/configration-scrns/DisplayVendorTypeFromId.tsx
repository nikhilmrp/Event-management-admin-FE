import NameDisplay from "@/components/common/NameDisplay";
import { useConfigrations } from "@/context/configrationContext";

const DisplayVendorTypeFromId = ({ id }: { id: number }) => {
  const { vendorTypes } = useConfigrations();

  return <NameDisplay data={vendorTypes} fieldKey="id" value={id} keyName="name" />;
};

export default DisplayVendorTypeFromId;
