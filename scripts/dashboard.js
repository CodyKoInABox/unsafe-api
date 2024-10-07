
// Unsafe login check
document.addEventListener('DOMContentLoaded', function() {

    // Check if the session token exists in localStorage
    const sessionToken = localStorage.getItem('session');

    if (!sessionToken) {
        // If no token exists, redirect back to the login page
        window.location.href = 'login.html';
        
    } else {
        // Validate the token by making a request to the backend
        fetch(`https://unsafe-api.onrender.com/validate-session/${sessionToken}`)
            .then(response => response.json())
            .then(data => {
                if (data.valid) {

                    // save the username for that session
                    const username = data.username

                    console.log('Session is valid');
                    console.log(`Username: ${username}`)

                    // set the username text as the username on the frontend
                    const usernameElement = document.getElementById('username');
                    usernameElement.innerText = username;

                } else {

                    console.error('Invalid session');

                    // Redirect to login page if the token is invalid
                    window.location.href = 'login.html';

                }
            })
            .catch(error => {
                console.error('Error validating session:', error);
                // Redirect to login page on error
                window.location.href = 'login.html';
            });
    }

    // Logout button functionality
    document.getElementById('logout-button').addEventListener('click', function() {

        localStorage.clear(); // Clear all local storage data

        window.location.href = 'login.html'; // Redirect to index page
    });

});


// Simple console functionality to log messages
const consoleOutput = document.querySelector('.output-console');

// Function to log messages
function logMessage(message) {
    const p = document.createElement('p');
    p.textContent = message;
    consoleOutput.appendChild(p);
}

// Example usage
logMessage('> Initializing console...');
logMessage('> Calculating nodes...');

// You can call logMessage with any string to add more messages to the console

let consoleDiv = document.querySelector('.output-console');

function log(message) {
    let p = document.createElement('p');
    p.textContent = message;
    consoleDiv.appendChild(p);
    // Always scroll to the bottom to show the latest message
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

// Array of random hacker-related messages
let hackerMessages = [
    '> Accessing system files',
    '> Bypassing security protocols',
    '> Decrypting passwords',
    '> Establishing connection',
    '> Injecting payload',
    '> Scanning for vulnerabilities',
    '> Hacking into mainframe',
    '> Extracting data',
    '> Downloading files',
    '> Compiling exploit',
    '> Access granted. Proceeding',
    '> Executing command',
    '> Finding IP addresses',
    '> Attempting brute force',
    '> Shutting down firewall',
    '> Connecting to server',
    '> Initiating transfer',
    '> Circumventing authentication',
    '> Executing reverse shell',
    '> Compromising database',
    '> Deploying malware',
    '> Connecting to 192.168.1.10',
    '> Connecting to 10.0.0.5',
    '> Scanning subnet 192.168.1.0/24',
    '> Performing SQL injection: SELECT * FROM users WHERE username = \'admin\'--',
    '> Executing CORS attack on https://example.com',
    '> Bypassing CORS restrictions',
    '> Attempting to steal JWT tokens',
    '> Inserting payload: \'<script>alert("XSS Attack")</script>\'',
    '> Launching DDoS attack on 203.0.113.42',
    '> Accessing backup database',
    '> Fetching API keys from config',
    '> SQL Injection detected: INSERT INTO users (username, password) VALUES (\'attacker\', \'1234\')',
    '> Exploiting path traversal: GET /../../../etc/passwd',
    '> Script execution initiated: ./exploit.sh',
    '> Establishing a reverse shell at 10.0.0.15',
    '> Privilege escalation in progress',
    '> Brute forcing SSH on 192.0.2.5',
    '> Executing script to extract sensitive data',
    '> Command executed: cat /etc/shadow',
    '> Running enumeration script',
    '> Dumping MySQL database: mysqldump -u root -p --all-databases > dump.sql',
    '> Reconnaissance completed on target network',
    '> Compromising the internal API at /api/v1/users',
    '> Creating backdoor access',
    '> Gaining shell access to remote server',
    '> Testing for open ports on 198.51.100.10',
    '> Downloading sensitive documents from /secure/files',
    '> Initiating session hijacking',
    '> Decrypting SSL certificates',
    '> Fuzzing input fields for vulnerabilities',
    '> Executing command: wget http://malicious.com/payload.sh',
    '> Extracting secrets from Kubernetes cluster',
    '> Spreading worm to nearby devices',
    '> Cracking password hash with brute force',
    '> Retrieving logs from /var/log/auth.log',
    '> Injecting code into running processes',
    '> Compromising firewall settings',
    '> Harvesting cookies from browser',
    '> Collecting user tokens from local storage',
    '> Exfiltrating data via FTP to 203.0.113.55',
    '> Setting up rogue DHCP server',
    '> Bypassing network segmentation',
    '> Disabling security alerts',
    '> Compiling new exploits',
    '> Command injection successful',
    '> Uploading backdoor file to server',
    '> RCE exploit executed successfully',
    '> Scanning for outdated software',
    '> Bruteforcing API endpoint /api/login',
    '> ls -la',
    '> cd /home/user/projects',
    '> git status',
    '> npm install express',
    '> python3 -m http.server',
    '> curl -I https://example.com',
    '> ssh user@192.168.1.1',
    '> ping 8.8.8.8',
    '> traceroute google.com',
    '> netstat -an',
    '> ifconfig',
    '> whoami',
    '> cat /etc/passwd',
    '> sudo apt-get update',
    '> ps aux | grep python',
    '> chmod +x script.sh',
    '> export PATH=$PATH:/usr/local/bin',
    '> find / -name "*.log"',
    '> tail -f /var/log/syslog',
    '> df -h',
    '> top',
    '> iptables -L',
    '> grep "error" /var/log/apache2/error.log',
    '> wget https://example.com/file.zip',
    '> echo $USER',
    '> nano /etc/hosts',
    '> git clone https://github.com/user/repo.git',
    '> math -x 15 + 27',
    '> ip addr show',
    '> curl -X POST -d "data=example" https://api.example.com/endpoint',
    '> nslookup example.com',
    '> ssh-keygen -t rsa',
    '> chmod 600 ~/.ssh/id_rsa',
    '> docker ps',
    '> docker-compose up -d',
    '> mysql -u root -p',
    '> psql -U postgres',
    '> python3 -m pip install requests',
    '> ip a',
    '> echo "Hello, World!"',
    '> clear',
    '> dig @8.8.8.8 example.com A',
    '> ping -c 4 192.168.0.1',
    '> traceroute -m 30 203.0.113.0',
    '> nslookup 192.0.2.1',
    '> whois 198.51.100.14',
    '> curl http://ipinfo.io/8.8.8.8',
    '> curl -X GET "https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_API_KEY&ip=2001:db8::1"',
    '> netcat -zv 10.0.0.5 80',
    '> ip route show',
    '> 00:1A:2B:3C:4D:5E:6F:70',
    '> 11:22:33:44:55:66:77:88',
    '> AA:BB:CC:DD:EE:FF:01:23',
    '> DE:AD:BE:EF:00:11:22:33',
    '> CA:FE:BA:BE:00:00:00:01',
    '> Tracking initiated: User detected in New York City, NY, USA - Latitude: 40.7128, Longitude: -74.0060 - Status: Active',
    '> Location update: User on the move in Tokyo, Japan - Latitude: 35.6762, Longitude: 139.6503 - Status: Engaged',
    '> Alert: User spotted in London, UK - Latitude: 51.5074, Longitude: -0.1278 - Status: In Transit',
    '> Observation: User located in Sydney, Australia - Latitude: -33.8688, Longitude: 151.2093 - Status: Stationary',
    '> Data logged: User traversing through Paris, France - Latitude: 48.8566, Longitude: 2.3522 - Status: Active',
    '> Tracking active: User moving in Dubai, UAE - Latitude: 25.276987, Longitude: 55.296249 - Status: On Route',
    '> Location confirmed: User detected in Rio de Janeiro, Brazil - Latitude: -22.9068, Longitude: -43.1729 - Status: Exploring',
    '> Update received: User present in Cape Town, South Africa - Latitude: -33.9249, Longitude: 18.4241 - Status: Active',
    '> User tracking: Detected in Moscow, Russia - Latitude: 55.7558, Longitude: 37.6173 - Status: Stationary',
    '> Surveillance log: User moving through Toronto, Canada - Latitude: 43.65107, Longitude: -79.347015 - Status: In Motion',
];


// Function to generate random hacker messages
function generateRandomMessage() {
    let randomIndex = Math.floor(Math.random() * hackerMessages.length);
    log(hackerMessages[randomIndex]);
}

// Infinite loop to print messages
setInterval(generateRandomMessage, 650); // Adjust the interval as needed (1000ms = 1 second)



// ============================================= //
// --------------------------------------------- //
// ============================================= //



var w = c.width = window.innerWidth,
		h = c.height = window.innerHeight,
		ctx = c.getContext( '2d' ),
		
		opts = {
			
			range: 160,
			baseConnections: 7,
			addedConnections: 3,
			baseSize: 4,
			minSize: 1,
			dataToConnectionSize: .15,
			sizeMultiplier: .7,
			allowedDist: 40,
			baseDist: 40,
			addedDist: 30,
			connectionAttempts: 100,
			
			dataToConnections: 1,
			baseSpeed: .04,
			addedSpeed: .05,
			baseGlowSpeed: .4,
			addedGlowSpeed: .3,
			
			rotVelX: .001,
			rotVelY: .0015,
			
            repaintColor: '#1111', // Dark green background
            connectionColor: 'hsla(120, 100%, 50%, alp)', // Bright green
            rootColor: 'hsla(120, 100%, 40%, alp)', // Slightly darker green for roots
            endColor: 'hsla(120, 100%, 30%, alp)', // Darker green for end connections
            dataColor: 'hsla(120, 100%, 60%, alp)', // Light green for data lines
			
			wireframeWidth: .2,
			wireframeColor: '#88f',
			
			depth: 300,
			focalLength: 1000,
			vanishPoint: {
				x: w / 2,
				y: h / 2
			}
		},
		
		squareRange = opts.range * opts.range,
		squareAllowed = opts.allowedDist * opts.allowedDist,
		mostDistant = opts.depth + opts.range,
		sinX = sinY = 0,
		cosX = cosY = 0,
		
		connections = [],
		toDevelop = [],
		data = [],
		all = [],
		tick = 0,
		totalProb = 0,
		
		animating = false,
		
		Tau = Math.PI * 2;

ctx.fillStyle = '#222';
ctx.fillRect( 0, 0, w, h );
ctx.fillStyle = '#ccc';
ctx.font = '50px Verdana';
ctx.fillText( 'Calculating Nodes', w / 2 - ctx.measureText( 'Calculating Nodes' ).width / 2, h / 2 - 15 );

window.setTimeout( init, 4 ); // to render the loading screen

function init(){
	
	connections.length = 0;
	data.length = 0;
	all.length = 0;
	toDevelop.length = 0;
	
	var connection = new Connection( 0, 0, 0, opts.baseSize );
	connection.step = Connection.rootStep;
	connections.push( connection );
	all.push( connection );
	connection.link();
	
	while( toDevelop.length > 0 ){
	
		toDevelop[ 0 ].link();
		toDevelop.shift();
	}
	
	if( !animating ){
		animating = true;
		anim();
	}
}
function Connection( x, y, z, size ){
	
	this.x = x;
	this.y = y;
	this.z = z;
	this.size = size;
	
	this.screen = {};
	
	this.links = [];
	this.probabilities = [];
	this.isEnd = false;
	
	this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random();
}
Connection.prototype.link = function(){
	
	if( this.size < opts.minSize )
		return this.isEnd = true;
	
	var links = [],
			connectionsNum = opts.baseConnections + Math.random() * opts.addedConnections |0,
			attempt = opts.connectionAttempts,
			
			alpha, beta, len,
			cosA, sinA, cosB, sinB,
			pos = {},
			passedExisting, passedBuffered;
	
	while( links.length < connectionsNum && --attempt > 0 ){
		
		alpha = Math.random() * Math.PI;
		beta = Math.random() * Tau;
		len = opts.baseDist + opts.addedDist * Math.random();
		
		cosA = Math.cos( alpha );
		sinA = Math.sin( alpha );
		cosB = Math.cos( beta );
		sinB = Math.sin( beta );
		
		pos.x = this.x + len * cosA * sinB;
		pos.y = this.y + len * sinA * sinB;
		pos.z = this.z + len *        cosB;
		
		if( pos.x*pos.x + pos.y*pos.y + pos.z*pos.z < squareRange ){
		
			passedExisting = true;
			passedBuffered = true;
			for( var i = 0; i < connections.length; ++i )
				if( squareDist( pos, connections[ i ] ) < squareAllowed )
					passedExisting = false;

			if( passedExisting )
				for( var i = 0; i < links.length; ++i )
					if( squareDist( pos, links[ i ] ) < squareAllowed )
						passedBuffered = false;

			if( passedExisting && passedBuffered )
				links.push( { x: pos.x, y: pos.y, z: pos.z } );
			
		}
		
	}
	
	if( links.length === 0 )
		this.isEnd = true;
	else {
		for( var i = 0; i < links.length; ++i ){
			
			var pos = links[ i ],
					connection = new Connection( pos.x, pos.y, pos.z, this.size * opts.sizeMultiplier );
			
			this.links[ i ] = connection;
			all.push( connection );
			connections.push( connection );
		}
		for( var i = 0; i < this.links.length; ++i )
			toDevelop.push( this.links[ i ] );
	}
}
Connection.prototype.step = function(){
	
	this.setScreen();
	this.screen.color = ( this.isEnd ? opts.endColor : opts.connectionColor ).replace( 'light', 30 + ( ( tick * this.glowSpeed ) % 30 ) ).replace( 'alp', .2 + ( 1 - this.screen.z / mostDistant ) * .8 );
	
	for( var i = 0; i < this.links.length; ++i ){
		ctx.moveTo( this.screen.x, this.screen.y );
		ctx.lineTo( this.links[ i ].screen.x, this.links[ i ].screen.y );
	}
}
Connection.rootStep = function(){
	this.setScreen();
	this.screen.color = opts.rootColor.replace( 'light', 30 + ( ( tick * this.glowSpeed ) % 30 ) ).replace( 'alp', ( 1 - this.screen.z / mostDistant ) * .8 );
	
	for( var i = 0; i < this.links.length; ++i ){
		ctx.moveTo( this.screen.x, this.screen.y );
		ctx.lineTo( this.links[ i ].screen.x, this.links[ i ].screen.y );
	}
}
Connection.prototype.draw = function(){
	ctx.fillStyle = this.screen.color;
	ctx.beginPath();
	ctx.arc( this.screen.x, this.screen.y, this.screen.scale * this.size, 0, Tau );
	ctx.fill();
}
function Data( connection ){
	
	this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random();
	this.speed = opts.baseSpeed + opts.addedSpeed * Math.random();
	
	this.screen = {};
	
	this.setConnection( connection );
}
Data.prototype.reset = function(){
	
	this.setConnection( connections[ 0 ] );
	this.ended = 2;
}
Data.prototype.step = function(){
	
	this.proportion += this.speed;
	
	if( this.proportion < 1 ){
		this.x = this.ox + this.dx * this.proportion;
		this.y = this.oy + this.dy * this.proportion;
		this.z = this.oz + this.dz * this.proportion;
		this.size = ( this.os + this.ds * this.proportion ) * opts.dataToConnectionSize;
	} else 
		this.setConnection( this.nextConnection );
	
	this.screen.lastX = this.screen.x;
	this.screen.lastY = this.screen.y;
	this.setScreen();
	this.screen.color = opts.dataColor.replace( 'light', 40 + ( ( tick * this.glowSpeed ) % 50 ) ).replace( 'alp', .2 + ( 1 - this.screen.z / mostDistant ) * .6 );
	
}
Data.prototype.draw = function(){
	
	if( this.ended )
		return --this.ended; // not sre why the thing lasts 2 frames, but it does
	
	ctx.beginPath();
	ctx.strokeStyle = this.screen.color;
	ctx.lineWidth = this.size * this.screen.scale;
	ctx.moveTo( this.screen.lastX, this.screen.lastY );
	ctx.lineTo( this.screen.x, this.screen.y );
	ctx.stroke();
}
Data.prototype.setConnection = function( connection ){
	
	if( connection.isEnd )
		this.reset();
	
	else {
		
		this.connection = connection;
		this.nextConnection = connection.links[ connection.links.length * Math.random() |0 ];
		
		this.ox = connection.x; // original coordinates
		this.oy = connection.y;
		this.oz = connection.z;
		this.os = connection.size; // base size
		
		this.nx = this.nextConnection.x; // new
		this.ny = this.nextConnection.y;
		this.nz = this.nextConnection.z;
		this.ns = this.nextConnection.size;
		
		this.dx = this.nx - this.ox; // delta
		this.dy = this.ny - this.oy;
		this.dz = this.nz - this.oz;
		this.ds = this.ns - this.os;
		
		this.proportion = 0;
	}
}
Connection.prototype.setScreen = Data.prototype.setScreen = function(){
	
	var x = this.x,
			y = this.y,
			z = this.z;
	
	// apply rotation on X axis
	var Y = y;
	y = y * cosX - z * sinX;
	z = z * cosX + Y * sinX;
	
	// rot on Y
	var Z = z;
	z = z * cosY - x * sinY;
	x = x * cosY + Z * sinY;
	
	this.screen.z = z;
	
	// translate on Z
	z += opts.depth;
	
	this.screen.scale = opts.focalLength / z;
	this.screen.x = opts.vanishPoint.x + x * this.screen.scale;
	this.screen.y = opts.vanishPoint.y + y * this.screen.scale;
	
}
function squareDist( a, b ){
	
	var x = b.x - a.x,
			y = b.y - a.y,
			z = b.z - a.z;
	
	return x*x + y*y + z*z;
}

function anim(){
	
	window.requestAnimationFrame( anim );
	
	ctx.globalCompositeOperation = 'source-over';
	ctx.fillStyle = opts.repaintColor;
	ctx.fillRect( 0, 0, w, h );
	
	++tick;
	
	var rotX = tick * opts.rotVelX,
			rotY = tick * opts.rotVelY;
	
	cosX = Math.cos( rotX );
	sinX = Math.sin( rotX );
	cosY = Math.cos( rotY );
	sinY = Math.sin( rotY );
	
	if( data.length < connections.length * opts.dataToConnections ){
		var datum = new Data( connections[ 0 ] );
		data.push( datum );
		all.push( datum );
	}
	
	ctx.globalCompositeOperation = 'lighter';
	ctx.beginPath();
	ctx.lineWidth = opts.wireframeWidth;
	ctx.strokeStyle = opts.wireframeColor;
	all.map( function( item ){ item.step(); } );
	ctx.stroke();
	ctx.globalCompositeOperation = 'source-over';
	all.sort( function( a, b ){ return b.screen.z - a.screen.z } );
	all.map( function( item ){ item.draw(); } );
	
	/*ctx.beginPath();
	ctx.strokeStyle = 'red';
	ctx.arc( opts.vanishPoint.x, opts.vanishPoint.y, opts.range * opts.focalLength / opts.depth, 0, Tau );
	ctx.stroke();*/
}

window.addEventListener( 'resize', function(){
	
	opts.vanishPoint.x = ( w = c.width = window.innerWidth ) / 2;
	opts.vanishPoint.y = ( h = c.height = window.innerHeight ) / 2;
	ctx.fillRect( 0, 0, w, h );
});
window.addEventListener( 'click', init );