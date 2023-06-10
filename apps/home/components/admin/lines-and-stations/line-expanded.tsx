import { useCallback, useState } from 'react'

import ChangeIndicator from '@/components/admin/change-indicator'
import { Button } from '@/components/button'
import Input from '@/components/input'
import { AddLineVariables } from '@/graphql/lines/add-line'
import { UpdateLineVariables } from '@/graphql/lines/update-line'
import TrainIcon from '@/icons/train.svg'
import LineType from '@/types/line'

import { AnimatePresence, motion } from 'framer-motion'
import { BlockPicker } from 'react-color'
import toast from 'react-hot-toast'
import OutsideClickHandler from 'react-outside-click-handler'

interface LineExpandedProps {
  line: LineType
  setExpanded: (expanded: string | undefined)=> void
  addNew?: boolean
  optimisticUpdate?: (variables: UpdateLineVariables)=> Promise<void>
  optimisticAdd?: (variables: AddLineVariables)=> Promise<void>
}

const LineExpanded = ({
  line, setExpanded, addNew = false, optimisticUpdate, optimisticAdd,
}: LineExpandedProps) => {
  const [lineUpdates, setLineUpdates] = useState(line)
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [confirmDiscard, setConfirmDiscard] = useState(false)

  const nameChanged = lineUpdates.name !== line.name
  const nameArChanged = lineUpdates.name_ar !== line.name_ar
  const colorChanged = lineUpdates.color !== line.color
  const zoneOnePricingChanged = lineUpdates.pricing?.priceZoneOne !== line.pricing?.priceZoneOne
  const zoneTwoPricingChanged = lineUpdates.pricing?.priceZoneTwo !== line.pricing?.priceZoneTwo
  const zoneThreePricingChanged = lineUpdates.pricing?.priceZoneThree !== line.pricing?.priceZoneThree
  const zoneOneSeniorPricingChanged = lineUpdates.pricing?.priceZoneOneSeniors !== line.pricing?.priceZoneOneSeniors
  const zoneTwoSeniorPricingChanged = lineUpdates.pricing?.priceZoneTwoSeniors !== line.pricing?.priceZoneTwoSeniors
  const zoneThreeSeniorPricingChanged = lineUpdates.pricing?.priceZoneThreeSeniors !== line.pricing?.priceZoneThreeSeniors

  const getIconColor = () => {
    const backgroundColorHex = lineUpdates.color || '#000'
    const backgroundColorRgb = backgroundColorHex.match(/\w\w/g)?.map((x: string) => parseInt(x, 16))
    if (!backgroundColorRgb) return 'white'
    const brightness = Math.round(((backgroundColorRgb[0] * 299) +
      (backgroundColorRgb[1] * 587) +
      (backgroundColorRgb[2] * 114)) / 1000)
    const textColor = (brightness > 125) ? 'black' : 'white'
    return textColor
  }

  const onAddClick = useCallback(async () => {
    if (!lineUpdates.name || !lineUpdates.name_ar)
      return toast.error('Line name is required')
    
    if (!lineUpdates.color)
      return toast.error('Line color is required')
    
    if (!lineUpdates.pricing?.priceZoneOne || !lineUpdates.pricing?.priceZoneOneSeniors)
      return toast.error('Zone 1 pricing is required')
    
    if (!lineUpdates.pricing?.priceZoneTwo || !lineUpdates.pricing?.priceZoneTwoSeniors)
      return toast.error('Zone 2 pricing is required')
    
    if (!lineUpdates.pricing?.priceZoneThree || !lineUpdates.pricing?.priceZoneThreeSeniors)
      return toast.error('Zone 3 pricing is required')
    
    try {
      await optimisticAdd?.({
        name: lineUpdates.name,
        name_ar: lineUpdates.name_ar,
        color: lineUpdates.color,
        priceZoneOne: lineUpdates.pricing?.priceZoneOne,
        priceZoneTwo: lineUpdates.pricing?.priceZoneTwo,
        priceZoneThree: lineUpdates.pricing?.priceZoneThree,
        priceZoneOneSeniors: lineUpdates.pricing?.priceZoneOneSeniors,
        priceZoneTwoSeniors: lineUpdates.pricing?.priceZoneTwoSeniors,
        priceZoneThreeSeniors: lineUpdates.pricing?.priceZoneThreeSeniors,
      })

      toast.success('Line added successfully')
    } catch (e) {
      toast.error('Failed to add line')
    }
  }, [lineUpdates.color,
    lineUpdates.name,
    lineUpdates.name_ar,
    lineUpdates.pricing?.priceZoneOne,
    lineUpdates.pricing?.priceZoneOneSeniors,
    lineUpdates.pricing?.priceZoneThree,
    lineUpdates.pricing?.priceZoneThreeSeniors,
    lineUpdates.pricing?.priceZoneTwo,
    lineUpdates.pricing?.priceZoneTwoSeniors,
    optimisticAdd])

  const onSaveClick = useCallback(async () => {
    if (!nameChanged && !nameArChanged && !colorChanged && !zoneOnePricingChanged && !zoneTwoPricingChanged && !zoneThreePricingChanged && !zoneOneSeniorPricingChanged && !zoneTwoSeniorPricingChanged && !zoneThreeSeniorPricingChanged) {
      toast('No changes to save', { icon: '👌' })
      setExpanded(undefined)
      return
    }

    try {
      setExpanded(undefined)

      const vars: UpdateLineVariables = {
        lineId: line.id,
      }
      
      if (nameChanged) vars.name = lineUpdates.name
      if (nameArChanged) vars.name_ar = lineUpdates.name_ar
      if (colorChanged) vars.color = lineUpdates.color
      if (zoneOnePricingChanged) vars.priceZoneOne = lineUpdates.pricing?.priceZoneOne
      if (zoneTwoPricingChanged) vars.priceZoneTwo = lineUpdates.pricing?.priceZoneTwo
      if (zoneThreePricingChanged) vars.priceZoneThree = lineUpdates.pricing?.priceZoneThree
      if (zoneOneSeniorPricingChanged) vars.priceZoneOneSeniors = lineUpdates.pricing?.priceZoneOneSeniors
      if (zoneTwoSeniorPricingChanged) vars.priceZoneTwoSeniors = lineUpdates.pricing?.priceZoneTwoSeniors
      if (zoneThreeSeniorPricingChanged) vars.priceZoneThreeSeniors = lineUpdates.pricing?.priceZoneThreeSeniors
      
      await optimisticUpdate?.(vars)

      toast.success('Line saved successfully')
    } catch (e) {
      setExpanded(line.id)
      toast.error('Failed to save line updates')
    }
  }, [colorChanged,
    line.id,
    lineUpdates.color,
    lineUpdates.name,
    lineUpdates.name_ar,
    lineUpdates.pricing?.priceZoneOne,
    lineUpdates.pricing?.priceZoneOneSeniors,
    lineUpdates.pricing?.priceZoneThree,
    lineUpdates.pricing?.priceZoneThreeSeniors,
    lineUpdates.pricing?.priceZoneTwo,
    lineUpdates.pricing?.priceZoneTwoSeniors,
    nameArChanged,
    nameChanged,
    optimisticUpdate,
    setExpanded,
    zoneOnePricingChanged,
    zoneOneSeniorPricingChanged,
    zoneThreePricingChanged,
    zoneThreeSeniorPricingChanged,
    zoneTwoPricingChanged,
    zoneTwoSeniorPricingChanged])

  const onDiscardClick = useCallback(() => {
    if (!nameChanged && !nameArChanged && !colorChanged && !zoneOnePricingChanged && !zoneTwoPricingChanged && !zoneThreePricingChanged && !zoneOneSeniorPricingChanged && !zoneTwoSeniorPricingChanged && !zoneThreeSeniorPricingChanged) {
      setLineUpdates(line)
      setExpanded(undefined)
      return
    }

    if (!confirmDiscard) {
      setConfirmDiscard(true)
      toast('Click again to discard changes', { icon: '⚠️' })
      return
    }

    setExpanded(undefined)
  }, [colorChanged,
    confirmDiscard,
    line,
    nameArChanged,
    nameChanged,
    setExpanded,
    zoneOnePricingChanged,
    zoneOneSeniorPricingChanged,
    zoneThreePricingChanged,
    zoneThreeSeniorPricingChanged,
    zoneTwoPricingChanged,
    zoneTwoSeniorPricingChanged])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      transition={{ duration: 0.4 }}
      className="group flex gap-6 flex-col relative w-full mt-2 py-6 px-6 rounded-lg border border-neutral-200 shadow-lg transition duration-200"
    >
      <div className="flex gap-4">
        <div className="relative">
          <button
            className="relative z-[11] w-16 h-16 rounded flex items-center justify-center border border-black/20"
            style={{
              background: lineUpdates.color,
            }}
            onClick={() => setIsPickerOpen(!isPickerOpen)}
          >
            <TrainIcon
              fill={getIconColor()}
              className="w-11 h-11"
            />
          </button>
          <AnimatePresence mode="wait">
            {isPickerOpen && (
              <OutsideClickHandler onOutsideClick={() => setIsPickerOpen(false)}>
                <motion.div
                  initial={{
                    opacity: 0, scale: 0.9, translateX: '-50%', translateY: '1em',
                  }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.1 }}
                  className="absolute top-full left-1/2 z-10 border border-neutral-200 rounded-lg shadow-lg"
                >
                  <BlockPicker
                    color={lineUpdates.color}
                    onChange={color => setLineUpdates({
                      ...lineUpdates,
                      color: color.hex,
                    })}
                  />
                </motion.div>
              </OutsideClickHandler>
            )}
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          <div className="flex flex-col items-start gap-1">
            <label
              htmlFor="line-name"
              className="text-sm font-medium text-neutral-500"
            >
              Line Name {nameChanged && <ChangeIndicator />}
            </label>
            <Input
              dir="ltr"
              id="line-name"
              placeholder="Line name"
              value={lineUpdates.name}
              className="font-medium"
              onChange={e => setLineUpdates({
                ...lineUpdates,
                name: e.target.value,
              })}
            />
          </div>
          <div className="flex flex-col items-end gap-1">
            <label
              htmlFor="line-name-ar"
              className="text-sm font-medium text-neutral-500"
            >
              Arabic Line Name {nameArChanged && <ChangeIndicator />}
            </label>
            <Input
              dir="rtl"
              id="line-name-ar"
              placeholder="اسم الخط"
              value={lineUpdates.name_ar}
              className="font-medium"
              onChange={e => setLineUpdates({
                ...lineUpdates,
                name_ar: e.target.value,
              })}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_0.5fr_0.5fr] items-center gap-2">
        <p
          className="text-sm font-medium text-neutral-500"
        >
          Zone
        </p>
        <p
          className="text-sm font-medium text-neutral-500"
        >
          Adults Price
        </p>
        <p
          className="text-sm font-medium text-neutral-500"
        >
          Seniors Price
        </p>
        <label>
          Zone One (9 stations)
        </label>
        <div className="flex items-center gap-2">
          <Input
            dir="ltr"
            id="pricing-zone-one"
            placeholder="Adults Price"
            type="number"
            value={lineUpdates.pricing?.priceZoneOne}
            className="font-medium !w-20"
            onChange={e => setLineUpdates({
              ...lineUpdates,
              pricing: {
                ...lineUpdates.pricing,
                priceZoneOne: parseFloat(e.target.value),
              },
            })}
          />
          <p className="flex items-center gap-1">
            EGP {zoneOnePricingChanged && <ChangeIndicator />}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            dir="ltr"
            id="pricing-zone-one=seniors"
            placeholder="Seniors Price"
            type="number"
            value={lineUpdates.pricing?.priceZoneOneSeniors}
            className="font-medium !w-20"
            onChange={e => setLineUpdates({
              ...lineUpdates,
              pricing: {
                ...lineUpdates.pricing,
                priceZoneOneSeniors: parseFloat(e.target.value),
              },
            })}
          />
          <p className="flex items-center gap-1">
            EGP {zoneOneSeniorPricingChanged && <ChangeIndicator />}
          </p>
        </div>
        <label>
          Zone Two (16 stations)
        </label>
        <div className="flex items-center gap-2">
          <Input
            dir="ltr"
            id="pricing-zone-two"
            placeholder="Adults Price"
            type="number"
            value={lineUpdates.pricing?.priceZoneTwo}
            className="font-medium !w-20"
            onChange={e => setLineUpdates({
              ...lineUpdates,
              pricing: {
                ...lineUpdates.pricing,
                priceZoneTwo: parseFloat(e.target.value),
              },
            })}
          />
          <p className="flex items-center gap-1">
            EGP {zoneTwoPricingChanged && <ChangeIndicator />}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            dir="ltr"
            id="pricing-zone-two-seniors"
            placeholder="Seniors Price"
            type="number"
            value={lineUpdates.pricing?.priceZoneTwoSeniors}
            className="font-medium !w-20"
            onChange={e => setLineUpdates({
              ...lineUpdates,
              pricing: {
                ...lineUpdates.pricing,
                priceZoneTwoSeniors: parseFloat(e.target.value),
              },
            })}
          />
          <p className="flex items-center gap-1">
            EGP {zoneTwoSeniorPricingChanged && <ChangeIndicator />}
          </p>
        </div>
        <label>
          Zone Three ({'>'}16 stations)
        </label>
        <div className="flex items-center gap-2">
          <Input
            dir="ltr"
            id="pricing-zone-three"
            placeholder="Adults Price"
            type="number"
            value={lineUpdates.pricing?.priceZoneThree}
            className="font-medium !w-20"
            onChange={e => setLineUpdates({
              ...lineUpdates,
              pricing: {
                ...lineUpdates.pricing,
                priceZoneThree: parseFloat(e.target.value),
              },
            })}
          />
          <p className="flex items-center gap-1">
            EGP {zoneThreePricingChanged && <ChangeIndicator />}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            dir="ltr"
            id="pricing-zone-three-seniors"
            placeholder="Seniors Price"
            type="number"
            value={lineUpdates.pricing?.priceZoneThreeSeniors}
            className="font-medium !w-20"
            onChange={e => setLineUpdates({
              ...lineUpdates,
              pricing: {
                ...lineUpdates.pricing,
                priceZoneThreeSeniors: parseFloat(e.target.value),
              },
            })}
          />
          <p className="flex items-center gap-1">
            EGP {zoneThreeSeniorPricingChanged && <ChangeIndicator />}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          variant="primary"
          className="w-full"
          onClick={addNew ? onAddClick : onSaveClick}
        >
          {addNew ? 'Add Line' : 'Save Changes'}
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          onClick={onDiscardClick}
        >
          {addNew ? 'Cancel' : 'Discard Changes'}
        </Button>
      </div>
    </motion.div>
  )
}

export default LineExpanded