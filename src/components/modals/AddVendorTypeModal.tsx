'use client'
import React, { useState } from 'react'
import  Button from '@/components/ui/button/Button'
import { Modal } from '../ui/modal'
import InputField from '../form/input/InputField'
import Label from '../form/input/Label'
import ToggleButton from '../form/ToggleButton'

const AddVendorTypeModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [vendorType, setVendorType] = useState('')
    const [status, setStatus] = useState(true)
    const [commision, setCommision] = useState(0)
    const handleSubmit = () => {
        console.log('Vendor type added:', vendorType, status)
        setIsOpen(false)
        setVendorType('')
        setStatus(false)
    }


  return (
    <div>
        <Button className="bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300" onClick={() => setIsOpen(true)}>Add Vendor Type</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} showCloseButton={true} className='space-y-4 max-w-md mx-auto p-6'>
            <h2 className='text-lg font-medium mt-4 mb-4'>Add Vendor Type</h2>
            <p className='text-sm text-gray-500 mb-4'>Add a new vendor type to the configuration</p>
            <form className='pt-4 space-y-4'>
                <Label htmlFor="vendor-type">Vendor Type Name</Label>
                <InputField
                    type="text"
                    placeholder="Enter vendor type name"
                    id="vendor-type"
                    name="vendor-type"
                    defaultValue={vendorType}
                    onChange={(e) => setVendorType(e.target.value)}
                />
                <div>
                    <label htmlFor="commision">Commition</label>
                    <InputField
                        type="number"
                        placeholder="Enter commision"
                        id="commision"
                        name="commision"
                        defaultValue={commision||""}
                        onChange={(e) => setCommision(Number(e.target.value))}
                    />
                    <ToggleButton label={status ? "Active" : "Inactive"} checked={status} onChange={(checked) => setStatus(checked)} />   
                </div>             
                <Button type="submit" className=" w-full bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300" onClick={handleSubmit}>Add Vendor Type</Button>
            </form>
        </Modal>
    </div>
  )
}

export default AddVendorTypeModal