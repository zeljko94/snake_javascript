
function Game()
{
	this.isRunning = false;
	this.isGameOver = false;
	var self = this;
	this.gameSpeed = 1;
	this.snake = new Snake();
	this.mapa = new Mapa(800,500);
	this.rows = this.mapa.canvas.height / 25;
	this.cols = this.mapa.canvas.width / 25;
	this.context = this.mapa.context;
	this.width = this.mapa.width;
	this.height = this.mapa.height;
	
	this.score = 0;

	this.food = null;


	var snake_part1_x = this.cols / 2;
	var snake_part1_y = this.rows / 2;
	var snakePart1 = new SnakePart(snake_part1_x,snake_part1_y);

	var snake_part2_x = this.cols / 2;
	var snake_part2_y = (this.rows / 2) + 1;
	var snakePart2 = new SnakePart(snake_part2_x,snake_part2_y);

	var snake_part3_x = this.cols / 2;
	var snake_part3_y = (this.rows / 2) + 2;
	var snakePart3 = new SnakePart(snake_part3_x,snake_part3_y);

	this.snake.bodyParts.push(snakePart1);
	this.snake.bodyParts.push(snakePart2);
	this.snake.bodyParts.push(snakePart3);

	this.spawnFood = function()
	{
		var isOk = false;
		var food_x = Math.floor((Math.random() * (this.cols-4)) + 1);
		var food_y = Math.floor((Math.random() * (this.rows-4)) + 1);

		while(isOk === false)
		{
			for(var i=0; i<this.snake.bodyParts.length; i++)
			{
				if(food_x == this.snake.bodyParts[i].x && food_y == this.snake.bodyParts[i].y)
				{
					food_x = Math.floor((Math.random() * (this.cols-4)) + 1);
					food_y = Math.floor((Math.random() * (this.rows-4)) + 1);
					break;
				}
				else
				{
					isOk = true;
				}
			}
		}
		this.food = new Food(food_x, food_y);
		this.drawFood();
	}

	this.drawBorder = function()
	{
		for(var i=0; i<this.cols; i++)
		{
			for(var j=0; j<this.rows; j++)
			{
				if(i==0 || j==0 || j==(this.rows-1) || i==(this.cols-1))
				{
					this.context.fillStyle = "#7a3f28";
					this.context.fillRect(i*25, j*25, 25, 25);
				}
			}
		}
	}

	this.drawScore = function()
	{
		this.context.font = "30px Arial";
		this.context.fillStyle = "black";
		this.context.fillText("Score: " + self.score, 550, 25);
	}

	this.drawFood = function()
	{
		this.context.fillStyle="red";
		this.context.fillRect(this.food.x*25,this.food.y*25, this.food.width, this.food.height);
	}

	this.drawSnake = function()
	{
		for(var i=0; i<this.snake.bodyParts.length; i++)
		{
			if(i==0)
			{
				this.context.fillStyle="green";
				this.context.fillRect(this.snake.bodyParts[i].x*25, this.snake.bodyParts[i].y*25, this.snake.width,this.snake.height);
			}
			else
			{
				this.context.fillStyle="Chartreuse";
				this.context.fillRect(this.snake.bodyParts[i].x*25, this.snake.bodyParts[i].y*25, this.snake.width,this.snake.height);
			}
		}
	}

	this.handleKeys = function()
	{
		window.onload = function()
		{
			window.addEventListener('keypress', function(e){
			switch(e.keyCode)
			{
				case 97:
				if(self.snake.facing === direction.desno) break;
				self.snake.facing = direction.lijevo;
				break;

				case 115:
				if(self.snake.facing === direction.gore) break;
				self.snake.facing = direction.dolje;
				break;

				case 100:
				if(self.snake.facing === direction.lijevo) break;
				self.snake.facing = direction.desno;
				break;

				case 119:
				if(self.snake.facing === direction.dolje) break;
				self.snake.facing = direction.gore;
				break;

				case 112:
				if(self.isRunning === true) 
				{
					self.context.font = "30px Arial";
					self.context.fillStyle="black";
					self.context.fillText("Game paused!", self.mapa.width/3, self.mapa.height/2);
					self.stop();	
				}
				else self.unpause();
				break;
			}
		});
		}
	}

	this.render = function()
	{
		self.mapa.clear();
		self.drawBorder();
		self.drawSnake();
		self.drawFood();
		self.drawScore();
	}

	this.updateInterval = null;

	this.update = function()
	{
		if(self.isGameOver === true)
		{
			self.gameover();
		}

		for(var i=1; i<self.snake.bodyParts.length; i++)
		{
			if(self.snake.bodyParts[i].x == self.snake.bodyParts[0].x && self.snake.bodyParts[i].y == self.snake.bodyParts[0].y)
			{
				self.isGameOver = true;
			}
		}

		if(self.snake.bodyParts[0].x === self.food.x && self.snake.bodyParts[0].y === self.food.y)
		{
			var bodyPart = new SnakePart(self.snake.bodyParts[self.snake.bodyParts.length-1].x,self.snake.bodyParts[self.snake.bodyParts.length-1].y);
			self.snake.bodyParts.push(bodyPart);
			self.spawnFood();

			self.score += 10;
		}

		var newHeadPart = new SnakePart(self.snake.bodyParts[0].x, self.snake.bodyParts[0].y);

		self.snake.bodyParts.unshift(newHeadPart);
		self.snake.bodyParts.pop();

		switch(self.snake.facing)
		{
			case direction.gore:
			if(self.snake.bodyParts[0].y*25- self.gameSpeed < 25)
			{
				self.isGameOver = true;
				break;
			}
			self.snake.bodyParts[0].y -= self.gameSpeed;
			break;

			case direction.dolje:
			if(self.snake.bodyParts[0].y*25 + self.gameSpeed > self.height-50)
			{
				self.isGameOver = true;
				break;
			}
			self.snake.bodyParts[0].y += self.gameSpeed;
			break;

			case direction.lijevo:
			if(self.snake.bodyParts[0].x*25 - self.gameSpeed < 25)
			{
				self.isGameOver = true;
				break;
			}
			self.snake.bodyParts[0].x -= self.gameSpeed;
			break;

			case direction.desno:
			if(self.snake.bodyParts[0].x*25 + self.gameSpeed > self.width-50)
			{
				self.isGameOver = true;
				break;
			}
			self.snake.bodyParts[0].x += self.gameSpeed;
			break;
		}
		self.render();
	}

	this.start = function()
	{
		this.isRunning = true;
		this.drawSnake();
		this.spawnFood();
		this.handleKeys();
		this.updateInterval = setInterval(this.update, 100);
	}

	this.unpause = function()
	{
		this.isRunning = true;
		this.drawSnake();
		this.handleKeys();
		this.updateInterval = setInterval(this.update, 100);
	}

	this.gameover = function()
	{
		this.isRunning = false;
		clearInterval(this.updateInterval);
		if(window.confirm("Vaš rezultat: " + self.score + "\nZapočni novu igru?"))
		{
			window.location.href="http://localhost/snake/snake_the_game.php";
		}
		else
		{
		}
	}

	this.stop = function()
	{
		this.isRunning = false;
		clearInterval(this.updateInterval);
	}
}

var game =  new Game();
game.start();
