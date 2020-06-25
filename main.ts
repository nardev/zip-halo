input.onButtonPressed(Button.A, function () {
    mode = false
    strip.setBrightness(0)
    for (let index = 0; index <= 150; index++) {
        strip.showColor(neopixel.colors(NeoPixelColors.Purple))
        strip.setBrightness(index)
        strip.show()
        basic.pause(25)
    }
    strip.setBrightness(80)
    strip.clear()
    mode = true
})
input.onButtonPressed(Button.AB, function () {
    mode = !(mode)
    if (mode) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.showIcon(IconNames.Target)
    }
})
input.onButtonPressed(Button.B, function () {
    mode = false
    strip.setBrightness(150)
    for (let index = 0; index <= 20; index++) {
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        strip.show()
        basic.pause(100)
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        strip.show()
        basic.pause(100)
    }
    strip.setBrightness(80)
    strip.clear()
    mode = true
})
let roll = 0
let pitch = 0
let mode = false
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)
mode = true
strip.setBrightness(80)
radio.setGroup(1)
basic.showIcon(IconNames.Happy)
let up = [22, 23, 0, 1, 2]
let right = [4, 5, 6, 7, 8]
let down = [10, 11, 12, 13, 14]
let left = [16, 17, 18, 19, 20]
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (mode) {
        if (pitch < -15) {
            for (let value of up) {
                strip.setPixelColor(value, neopixel.colors(NeoPixelColors.Red))
            }
        }
        if (roll > 15) {
            for (let value of right) {
                strip.setPixelColor(value, neopixel.colors(NeoPixelColors.Orange))
            }
        }
        if (pitch > 15) {
            for (let value of down) {
                strip.setPixelColor(value, neopixel.colors(NeoPixelColors.Blue))
            }
        }
        if (roll < -15) {
            for (let value of left) {
                strip.setPixelColor(value, neopixel.colors(NeoPixelColors.Green))
            }
        }
        if (pitch < -15 && roll > 15) {
            strip.setPixelColor(3, neopixel.colors(NeoPixelColors.White))
        }
        if (roll > 15 && pitch > 15) {
            strip.setPixelColor(9, neopixel.colors(NeoPixelColors.White))
        }
        if (pitch > 15 && roll < -15) {
            strip.setPixelColor(15, neopixel.colors(NeoPixelColors.White))
        }
        if (roll < -15 && pitch < -15) {
            strip.setPixelColor(21, neopixel.colors(NeoPixelColors.White))
        }
        strip.show()
        basic.pause(50)
        strip.clear()
    } else {
        if (pitch < -15) {
            radio.sendNumber(1)
        }
        if (roll > 15) {
            radio.sendNumber(2)
        }
        if (pitch > 15) {
            radio.sendNumber(3)
        }
        if (roll < -15) {
            radio.sendNumber(4)
        }
        if (roll > -15 && roll < 15 && (pitch > -15 && pitch < 15)) {
            radio.sendNumber(5)
        }
    }
})
