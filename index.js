var debug=$('debug')('domojs:terminal');

var pty=require('pty.js');

exports.init=function(config, app)
{
    $.io.of('/terminal').on('connection', function(socket){
        
        debug('spawning bash');
        var cp=pty.spawn('bash', ['-l'], {name: 'xterm-color',
              cols: 300,
              rows: 50,
              cwd: process.env.HOME,
              env: process.env
        });
        debug(cp);
        /*cp.stdout.setEncoding('utf8');
        cp.stderr.setEncoding('utf8');*/
        socket.on('disconnect', function(){
            debug('killing bash ('+cp.pid+')');
            cp.kill();
        });
        
        socket.on('stdin', function(data){
            //debug('received ',data);
            cp.write(data);
        });
        
        cp.on('data', (data) => {
            //debug('sending ', data)
            socket.emit('stdout', data);
        });
        
        cp.on('close', (code) => {
            debug('bash terminated');
            socket.emit('close', code);
        });
    });
};