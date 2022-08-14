/*
 A *simple Space game using Kaboom.js
 Copyright (C) <2022>  <Emmanuel>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.

 */
kaboom({
	global: true,
	fullscreen: true,
	scale: 1,
	debug: true,
        background: [42, 43, 43]
})

// load ship
const ship_angles = [
	'spaceship-forward',
	'spaceship-kinda-up',
	'spaceship-kinda-down',
	'spaceship-up',
	'spaceship-down'

]

for (spaceship of ship_angles){
	loadSprite(spaceship,`./sprites/${spaceship}.png`)
}

//
const backgnd_planet = [
	'planet1',
	'planet2',
	'planet3']
const backgnd_star = [
	'star-nova',
	'star-red',
	'star-white'
]

for (backgnd_object_p of backgnd_planet){
	loadSprite(backgnd_object_p,`./sprites/${backgnd_object_p}.png`)
}
for (backgnd_object_s of backgnd_star){
	loadSprite(backgnd_object_s,`./sprites/${backgnd_object_s}.png`)
}

scene("space", () => {

	let BG_X_SPEED = -220
	let BG_Y_SPEED = 0
	let PAUSED =true
	const x= 240
	const y = 80

	layers(["bg","game"])

 	const player = add([
		sprite('spaceship-forward'),
		area(),
		layer('game'),
		pos(50,height()/2),
		origin("center"),
		"spaceship-forward",
		{
			state: 'spaceship-forward'
		}
	])


// ship keys
onKeyPress('up', () => {
	switch(player.state){
		case 'spaceship-forward':
			player.state = 'spaceship-kinda-up'
			player.use(sprite('spaceship-kinda-up'))
			BG_X_SPEED = -x
			BG_Y_SPEED = y
			break

		case 'spaceship-down':
			player.state = 'spaceship-kinda-down'
			player.use(sprite('spaceship-kinda-down'))
			BG_X_SPEED = -x
			BG_Y_SPEED = -y
			break

		case 'spaceship-kinda-down':
			player.state = 'spaceship-forward'
			player.use(sprite('spaceship-forward'))
			BG_X_SPEED = -x
			BG_Y_SPEED = 0
			break

		default:
			player.state = 'spaceship-up'
			player.use(sprite('spaceship-up'))
			BG_X_SPEED = 0
			BG_Y_SPEED = x
			break
	}
})

onKeyPress('down', () => {
	switch(player.state){
		case 'spaceship-forward':
			player.state = 'spaceship-kinda-down'
			player.use(sprite('spaceship-kinda-down'))
			BG_X_SPEED = -x
			BG_Y_SPEED = -y
			break

		case 'spaceship-up':
			player.state = 'spaceship-kinda-up'
			player.use(sprite('spaceship-kinda-up'))
			BG_X_SPEED = -x
			BG_Y_SPEED = y
			break

		case 'spaceship-kinda-up':
			player.state = 'spaceship-forward'
			player.use(sprite('spaceship-forward'))
			BG_X_SPEED = -x
			BG_Y_SPEED = 0
			break

		default:
			player.state = 'spaceship-down'
			player.use(sprite('spaceship-down'))
			BG_X_SPEED = 0
			BG_Y_SPEED = -x
			break
	}
})

onKeyPress('right', () => {
	BG_X_SPEED = -x
	BG_Y_SPEED = 0
	player.state = 'spaceship-forward'
	player.use(sprite('spaceship-forward'))
})

onKeyDown(".", () => {
	switch(player.state){
		case 'spaceship-forward':
			BG_X_SPEED += -4
			break

		case 'spaceship-up':
			BG_Y_SPEED += 4
			break

		case 'spaceship-kinda-up':
			BG_X_SPEED += -4
			BG_Y_SPEED += 4
			break

		case 'spaceship-down':
			BG_Y_SPEED += -4
			break

		case 'spaceship-kinda-down':
			BG_X_SPEED += -4
			BG_Y_SPEED += -4
			break

		default:
			BG_X_SPEED = 0
			BG_Y_SPEED += -4
			break
	}
})
onKeyRelease(".", () => {
	BG_X_SPEED = BG_X_SPEED
	BG_Y_SPEED = BG_Y_SPEED
})

onKeyDown(",", () => {
	switch(player.state){
		case 'spaceship-forward':
			BG_X_SPEED += 4
			break

		case 'spaceship-up':
			BG_Y_SPEED += -4
			break

		case 'spaceship-kinda-up':
			BG_X_SPEED += 4
			BG_Y_SPEED += -4
			break

		case 'spaceship-down':
			BG_Y_SPEED += 4
			break

		case 'spaceship-kinda-down':
			BG_X_SPEED += 4
			BG_Y_SPEED += 4
			break

		default:
			BG_X_SPEED = 0
			BG_Y_SPEED += 4
			break
	}
})

onKeyRelease(",", () => {
	BG_X_SPEED = BG_X_SPEED
	BG_Y_SPEED = BG_Y_SPEED
})

//ship keys

onKeyPress('p',() => {
	if(PAUSED == true){
		PAUSED=false
	}
	else{
		PAUSED=true
	}
})

//creating background
function createPlanets(){
	//const plt=choose(backgnd_planet)
	const bimg1=add([
		sprite(choose(backgnd_planet)),
		area(),
		pos(null,null),
		layer('bg'),
		origin("center"),
		"back_imgpl1"
	])
	const bimg2=add([
		sprite(choose(backgnd_planet)),
		area(),
		pos(null,null),
		layer('bg'),
		origin("center"),
		"back_imgpl2"
	])

	switch (player.state){

		case 'spaceship-kinda-up':
			bimg1.use(pos(rand(width()),0))
			bimg2.use(pos(width(),rand(height())))
			break

		case 'spaceship-up':
			bimg1.use(pos(rand(width()),0))
			bimg2.use(pos(null,null))
			break

		case 'spaceship-kinda-down':
			bimg1.use(pos(rand(width()),height()))
			bimg2.use(pos(width(),rand(height())))
			break

		case 'spaceship-down':
			bimg1.use(pos(rand(width()),height()))
			bimg2.use(pos(null,null))
			break

		default:
			bimg1.use(pos(width(),rand(height())))
			bimg2.use(pos(null,null))
			break
	}
}

function createStar(){
	//const staar = choose(backgnd_star)
	const bimg1=add([
		sprite(choose(backgnd_star)),
		area(),
		pos(null,null),
		layer('bg'),
		origin("center"),
		"back_imgstr1"
	])
	const bimg2=add([
		sprite(choose(backgnd_star)),
		area(),
		pos(null,null),
		layer('bg'),
		origin("center"),
		"back_imgstr2"
	])
	switch (player.state){

		case 'spaceship-kinda-up':
		bimg1.use(pos(rand(width()),0))
		bimg2.use(pos(width(),rand(height())))
		break

		case 'spaceship-up':
			bimg1.use(pos(rand(width()),0))
			bimg2.use(pos(null,null))
			break

		case 'spaceship-kinda-down':
			bimg1.use(pos(rand(width()),height()))
			bimg2.use(pos(width(),rand(height())))
			break

		case 'spaceship-down':
			bimg1.use(pos(rand(width()),height()))
			bimg2.use(pos(null,null))
			break

		default:
			bimg1.use(pos(width(),rand(height())))
			bimg2.use(pos(null,null))
			break
		}
}

loop(0.2,() => {
	if (PAUSED != true){
		createStar()
	}
})

loop(5,() => {
	if (PAUSED != true){
		createPlanets()
	}
})
//background


onUpdate("back_imgstr2",(bi1) => {
	if (PAUSED != true){
		bi1.move(BG_X_SPEED,BG_Y_SPEED)
		if(bi1.pos.x < 0 || bi1.pos.y < 0){
			destroy(bi1)
		}
	}
})

onUpdate("back_imgstr1",(bi2) => {
	if (PAUSED != true){
		bi2.move(BG_X_SPEED,BG_Y_SPEED)
		if(bi2.pos.x < 0 || bi2.pos.y < 0){
			destroy(bi2)
		}
	}
})

onUpdate("back_imgpl2",(bi3) => {
	if (PAUSED != true){
		bi3.move(BG_X_SPEED,BG_Y_SPEED)
		if(bi3.pos.x < 0 || bi3.pos.y < 0){
			destroy(bi3)
		}
	}
})

onUpdate("back_imgpl1",(bi4) => {
	if (PAUSED != true){
		bi4.move(BG_X_SPEED,BG_Y_SPEED)
		if(bi4.pos.x < 0 || bi4.pos.y < 0){
			destroy(bi4)
		}
	}
})




})

go("space")
